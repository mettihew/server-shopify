const express = require("express");
const {
  createColor,
  updateColor,
  getAColor,
  deleteColor,
  getAllColor,
} = require("../controllers/colorCtr");
// const { authMiddleware, isAdmin } = require("../middlewears/authMiddleware");
const router = express.Router();

router.post("/", createColor);
router.put("/:id", updateColor);
router.delete("/:id", deleteColor);
router.get("/:id", getAColor);
router.get("/", getAllColor);

module.exports = router;
