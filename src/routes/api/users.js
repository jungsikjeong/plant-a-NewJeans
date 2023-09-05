const express = require('express');
const router = express.Router();

const passport = require('passport');

const bcrypt = require('bcrypt');

const isLogin = require('../../middleware/isLogin');
const User = require('../../models/User');
const Post = require('../../models/Post');

/** 마이페이지에서 내가 쓴글 불러오기 */
router.get('/mypage', isLogin, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user }).sort({ _id: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// 소셜로그인으로 로그인 안하고, 정보를 변경하려고 할 때
// 유저정보 확인차원에서 유저의 비밀번호 확인하는 라우터
router.post('/password/check', isLogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(401).send('사용자가 없습니다.');
    } else {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        return res.status(200).json('인증 완료');
      } else {
        return res.status(401).json('비밀번호가 틀렸습니다.');
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// 유저 정보 변경
router.post('/edit/profile', isLogin, async (req, res) => {
  // const { username, password, usernameMode, passwordMode } = req.body;
  const { username, password } = req.body;

  try {
    let newUser;
    const user = await User.findById(req.user);

    // 이름만 바꾸면,
    if (username && !password) {
      newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            username: username ? username : user.username,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      return res.json(newUser);
    }

    // 패스워드만 바꾸면,
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            password: hash,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      return res.json(newUser);
    }

    // 이름, 패스워드 둘다 바꾸게된다면,
    if (username && password) {
      const hash = await bcrypt.hash(password, 10);

      newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            username: username ? username : user.username,
            password: hash,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      return res.json(newUser);
    }

    return res.json('');
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
