const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
} = require("../controllers/blogCtr");
// const { authMiddleware, isAdmin } = require("../middlewears/authMiddleware");
const { uploadPhoto, blogImgResize } = require("../middlewears/uploadImages");
const router = express.Router();

router.post("/", createBlog);
router.put(
  "/upload/:id",
  // authMiddleware,
  // isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.put("/likes", likeBlog);
router.put("/dislikes", disLikeBlog);
router.put("/:id", updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", deleteBlog);

module.exports = router;
