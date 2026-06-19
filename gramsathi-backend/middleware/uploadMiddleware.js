const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("Uploading file:", file.originalname);

    return {
      folder: "gramsathi",
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],
    };
  },
});

const upload = multer({
  storage,
});

module.exports = upload;