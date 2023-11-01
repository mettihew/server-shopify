const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validDateMongodbId = require("../utils/validDateMongodbId");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (er) {
    throw new Error(er);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const updateCate = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCate);
  } catch (er) {
    throw new Error(er);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const updateCate = await Brand.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(updateCate);
  } catch (er) {
    throw new Error(er);
  }
});
 
const getABrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const getaCate = await Brand.findById(id, req.body, {
      new: true,
    });
    res.json(getaCate);
  } catch (er) {
    throw new Error(er);
  }
});
const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const a = await Brand.find();
    res.json(a);
  } catch (er) {
    throw new Error(er);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getABrand,
  getAllBrand,
};
