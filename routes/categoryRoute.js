const express = require("express");
const {
  createCategory,
  updateCategory,
  getACategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/categoryCtr");
const { authMiddleware, isAdmin } = require("../middlewears/authMiddleware");
const router = express.Router();

router.post("/", createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", authMiddleware, isAdmin, getACategory);
router.get("/", getAllCategory);

module.exports = router;
