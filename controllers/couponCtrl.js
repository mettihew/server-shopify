const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validDateMongodbId = require("../utils/validDateMongodbId");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getACoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const co = await Coupon.findById(id);
    res.json(co);
  } catch (error) {
    throw new Error(error);
  }
});

const updateACoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const co = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(co);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteACoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const co = await Coupon.findByIdAndDelete(id);
    res.json(co);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const co = await Coupon.find();
    res.json(co);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getAllCoupons,
  getACoupon,
  deleteACoupon,
  updateACoupon,
};
