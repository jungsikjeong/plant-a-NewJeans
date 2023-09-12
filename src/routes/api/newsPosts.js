const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const isLogin = require('../../middleware/isLogin');
const upload = require('../../middleware/multer');

const NewsPost = require('../../models/newspost');
const User = require('../../models/User');

function dataFun() {
  let now = new Date();
  let yearNum = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let year = yearNum.toString();
  let newYear = parseInt(year.substr(2, 3));
  let fullDate = '';

  fullDate = `${newYear}.${month}.${date}${hours}${minutes}${seconds}`;

  return fullDate;
}

/** 모든 게시글 불러오기 */
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  try {
    const itemsPerPage = 3;
    const posts = await NewsPost.find()
      .sort({
        _id: -1,
      })
      .lean();

    // const posts = await NewsPost.find()
    //   .sort({
    //     _id: -1,
    //   })
    //   .skip((page - 1) * itemsPerPage)
    //   .limit(itemsPerPage)
    //   .lean();

    // console.log(posts);

    const postCount = await NewsPost.countDocuments().exec();

    res.header('Last-Page', postCount);

    return res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 특정 게시글 불러오기 */
router.get('/:id', async (req, res) => {
  try {
    const post = await NewsPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    return res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// 이미지 수정 시에 필요한 정보와 동작을 구현한 코드
router.post('/:id', isLogin, upload.array('images', 3), async (req, res) => {
  try {
    const obj = JSON.parse(JSON.stringify(req.body));
    const { title, contents, deletedImages } = JSON.parse(obj.data);

    const post = await NewsPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    // 기존 이미지와 새로운 이미지
    const existingImages = post.image;
    const newImages = req.files.map((file) => file.key);

    // 이미지 삭제한 경우
    const removedImages = deletedImages || [];
    const remainingImages = existingImages.filter(
      (image) => !removedImages.includes(image)
    );

    // 새로운 이미지와 기존 이미지 결합
    const updatedImages = [...remainingImages, ...newImages];

    // AWS S3 인스턴스 생성
    const s3 = new AWS.S3();
    // AWS S3에서 이미지 삭제
    removedImages.forEach(async (imageFileName) => {
      const params = {
        Bucket: 'plant-newjeans/gallery', // S3 버킷 이름
        Key: imageFileName, // 파일명
      };
      await s3.deleteObject(params).promise();
    });

    // 게시글 업데이트
    const updatedPost = await NewsPost.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: title,
          contents: contents,
          image: updatedImages,
        },
      },
      { new: true }
    ).exec();

    return res.json(updatedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 선택한 게시글 삭제하기 */
router.delete('/select/delete', isLogin, async (req, res) => {
  try {
    const selectedPostIds = req.body; // 선택한 게시글의 ID 목록

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 선택한 게시글 ID 목록을 사용하여 게시글 삭제
    for (const postId of selectedPostIds) {
      const post = await NewsPost.findById(postId);

      if (!post) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }

      // 게시글의 작성자와 현재 사용자를 비교하여 권한 확인
      if (post.user.toString() === req.user.toString()) {
        // AWS S3 인스턴스 생성
        const s3 = new AWS.S3();

        // 모든 게시물의 이미지를 삭제
        for (const imageFileName of post.image) {
          const params = {
            Bucket: 'plant-newjeans/gallery', // S3 버킷 이름
            Key: imageFileName, // 파일명
          };

          // 이미지 삭제
          await s3.deleteObject(params).promise();
        }

        await post.deleteOne(); // 게시글 삭제
      } else {
        // 권한이 없는 경우에 대한 처리
        return res.status(403).json({ message: '권한이 없습니다.' });
      }
    }

    // 모든 게시글이 삭제되었거나 권한이 있어 삭제한 경우 성공 응답 반환
    return res
      .status(200)
      .json({ message: '게시글이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 자기가 작성한 모든 게시글 삭제하기 */
router.delete('/all/delete', isLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const posts = await NewsPost.find({ user: user._id });

    // AWS S3 인스턴스 생성
    const s3 = new AWS.S3();

    // 모든 게시물의 이미지를 삭제
    for (const post of posts) {
      for (const imageFileName of post.image) {
        const params = {
          Bucket: 'plant-newjeans/gallery', // S3 버킷 이름
          Key: imageFileName, // 파일명
        };

        // 이미지 삭제
        await s3.deleteObject(params).promise();
      }
    }

    // 모든 게시글 삭제
    await NewsPost.deleteMany({ user: user._id });

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 게시글 작성 */
router.post('/', isLogin, upload.array('images', 3), async (req, res) => {
  const { title, contents, fileNames } = req.body;

  const currentDate = dataFun();

  try {
    const newPost = new NewsPost({
      title: title,
      contents: contents,
      image: fileNames,
      user: req.user,
      date: currentDate,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (error) {
    console.error('error.message:', error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
