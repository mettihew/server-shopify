const asyncHandler = require("express-async-handler");
const fs = require("fs");

const {
  colidanryUpdateImage,
  colidanryDeleteImage,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => colidanryUpdateImage(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const del = colidanryDeleteImage(id, "images");
    res.json("deleted");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImage,
};