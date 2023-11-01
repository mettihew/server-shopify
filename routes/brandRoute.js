const express = require("express");
const {
  createBrand,
  updateBrand,
  getABrand,
  deleteBrand,
  getAllBrand,
} = require("../controllers/brandCtr");
const { authMiddleware, isAdmin } = require("../middlewears/authMiddleware");
const router = express.Router();

router.post("/", createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", deleteBrand);
router.get("/:id", authMiddleware, isAdmin, getABrand);
router.get("/", getAllBrand);

module.exports = router;
