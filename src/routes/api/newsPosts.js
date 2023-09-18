const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const isLogin = require('../../middleware/isLogin');
const upload = require('../../middleware/multer');

const NewsPost = require('../../models/NewsPost');
const Post = require('../../models/Post');
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

    const postCount = await NewsPost.countDocuments().exec();
    res.header('Last-Page', postCount);

    return res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/** 게시글 삭제하기 */
router.delete('/:id', isLogin, async (req, res) => {
  const { news, posts } = req.query;

  try {
    // posts을 삭제할 때
    if (posts !== 'undefined') {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }

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

      return res
        .status(200)
        .json({ message: '게시글이 성공적으로 삭제되었습니다.' });

      return;
    }

    if (news !== 'undefined') {
      const newsPost = await NewsPost.findById(req.params.id);

      if (!newsPost) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }

      // AWS S3 인스턴스 생성
      const s3 = new AWS.S3();
      // 모든 게시물의 이미지를 삭제
      for (const imageFileName of newsPost.image) {
        const params = {
          Bucket: 'plant-newjeans/news', // S3 버킷 이름
          Key: imageFileName, // 파일명
        };
        // 이미지 삭제
        await s3.deleteObject(params).promise();
      }

      await newsPost.deleteOne(); // 게시글 삭제

      return res
        .status(200)
        .json({ message: '게시글이 성공적으로 삭제되었습니다.' });
    }
  } catch (error) {
    console.log(error);
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

/** 특정 게시글 수정하기 */
router.put('/:id', isLogin, async (req, res) => {
  const { title, contents, fileNames, deletedImages } = req.body;

  const currentDate = dataFun();

  try {
    const post = await NewsPost.findById(req.params.id);
    if (post) {
      // 기존 이미지
      const existingImages = post.image;
      // 새로운 이미지
      const newImages = [...fileNames];

      // 기존이미지 삭제한 경우
      // 기존이미지중에서 삭제한 이미지를 제외한 값을 리턴함
      const removedImages = deletedImages || [];
      const remainingImages = existingImages.filter(
        (image) => !deletedImages.includes(image)
      );

      // 새로운 이미지와 기존 이미지 결합
      const updatedImages = [...remainingImages, ...newImages];

      const newPost = await NewsPost.findByIdAndUpdate(
        post,
        {
          $set: {
            title: title,
            contents: contents,
            image: updatedImages,
            user: req.user,
            date: currentDate,
          },
        },
        { new: true }
      ).exec();
      return res.json(newPost);
    }
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
