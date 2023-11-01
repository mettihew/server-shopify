const express = require("express");
const {
  createCategory,
  updateCategory,
  getACategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/blogCatCtr");
const { authMiddleware, isAdmin } = require("../middlewears/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", authMiddleware, isAdmin, getACategory);
router.get("/", authMiddleware, isAdmin, getAllCategory);

module.exports = router;
