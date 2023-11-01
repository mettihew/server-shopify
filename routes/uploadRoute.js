const router = require("express").Router();
const { uploadImages, deleteImage } = require("../controllers/uploadCtr");
const { isAdmin, authMiddleware } = require("../middlewears/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewears/uploadImages");

router.post(
  "/",
  // authMiddleware,
  // isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.delete("/delete-img/:id", deleteImage);
// authMiddleware, isAdmin,

module.exports = router;
