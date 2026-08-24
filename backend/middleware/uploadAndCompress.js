const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log('📁 FILE RECEIVED:', file.originalname);
  console.log('📁 MIME TYPE:', file.mimetype);

  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

const processAndUploadImage = async (req, res, next) => {

  console.log('🚀 processAndUploadImage started');

  if (!req.file) {
    console.log('❌ No req.file found');
    return next();
  }

  console.log('✅ req.file exists');
  console.log('📦 File size:', req.file.size);

  try {

    console.log('🔄 Starting Sharp...');

    const compressedBuffer = await sharp(req.file.buffer)
      .resize({
      width: 1600,
        withoutEnlargement: true
      })
      .webp({
    quality: 95,
  effort: 4
  })
      .toBuffer();

    console.log('✅ Sharp completed');
    console.log('📦 Compressed size:', compressedBuffer.length);

    console.log('☁️ Uploading to Cloudinary...');

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'nextcom/products',
        format: 'webp'
      },
      (error, result) => {

        if (error) {
          console.error('❌ CLOUDINARY ERROR:', error);

          return res.status(500).json({
            message: 'Cloudinary upload failed',
            error: error.message
          });
        }

        console.log('✅ CLOUDINARY UPLOAD SUCCESS');
        console.log('🔗 URL:', result.secure_url);

        req.body.image = result.secure_url;

        next();
      }
    );

    uploadStream.end(compressedBuffer);

  } catch (error) {

    console.error('❌ IMAGE PROCESSING ERROR:', error);

    return res.status(500).json({
      message: 'Image compression failed',
      error: error.message
    });
  }
};

module.exports = {
  upload,
  processAndUploadImage
};