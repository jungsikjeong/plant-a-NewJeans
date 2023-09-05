const axios = require('axios');
const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

/** user by token */
router.get('/', async (req, res, next) =>
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    // console.log(req.header('Authorization'));

    // passport.jwt token === undefined
    if (info) {
      return res
        .status(401)
        .json([{ msg: 'JsonWebTokenError: invalid signature' }]);
    }

    // token && user find
    if (user) {
      const findUser = await User.findById({ _id: user._id })
        .select('-password')
        .select('-posts')
        .exec();

      return res.json({
        user: findUser,
      });
    }
  })(req, res, next)
);

/** register */
router.post('/register', async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    try {
      if (err) {
        const error = new Error('An error occurred.');

        return next(error);
      }

      //  passport에서 인증 실패한 메시지가 나옴
      if (info) {
        return res.status(401).json(info);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        });

        return res.json({ success: true, user, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

/** login */
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      //  passport에서 인증 실패한 메시지가 나옴
      if (info) {
        return res.status(401).json(info);
      }

      if (!user) {
        return res.status(401).json({
          errors: { msg: '유저를 찾을 수 없습니다.' },
        });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, userId: user.userId };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post('/kakao', async (req, res, next) => {
  const { access_token } = req.body;

  const header = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    Authorization: `Bearer ${access_token}`,
  };
  // 카카오 사용자 정보 조회
  const get = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: header,
  });
  const result = get.data;

  // 카카오 유저가 웹 db에 저장되있는지 확인
  const user = await User.findOne({
    snsId: result.id,
  });

  if (user) {
    // 유저가 이미 존재한다면 회원가입 및 로그인 성공
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, access_token });
  } else {
    // 가입 이력없으면 회원가입시키고 로그인 성공
    const newUser = await User.create({
      email: result.kakao_account.email,
      username: result.properties.nickname,
      snsId: result.id,
      provider: 'kakao',
      password: result.id,
    });

    await newUser.save();

    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, access_token });
  }
});

module.exports = router;
