const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const crypto = require('crypto');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

dotenv.config();

//* aws region 및 자격증명 설정
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: 'ap-northeast-2',
});

//* AWS S3 multer 설정
const upload = multer({
  storage: multerS3({
    // 저장 위치
    s3: new AWS.S3(),
    bucket: 'plant-newjeans/gallery',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      // 랜덤이름으로 aws s3에 저장
      const randomBytes = crypto.randomBytes(16);
      const fileName =
        randomBytes.toString('hex') + path.extname(file.originalname);
      console.log(fileName, file.originalname);
      cb(null, fileName);
    },
  }),
  //* 용량 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
