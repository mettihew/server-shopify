const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  getACoupon,
  deleteACoupon,
  updateACoupon,
} = require("../controllers/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewears/authMiddleware");
const router = express.Router();

router.put("/:id", authMiddleware, isAdmin, updateACoupon);
router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/:id", authMiddleware, isAdmin, getACoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.delete("/:id", authMiddleware, isAdmin, deleteACoupon);

module.exports = router;
