const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validDateMongodbId = require("../utils/validDateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (er) {
    throw new Error(er);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const updateCate = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCate);
  } catch (er) {
    throw new Error(er);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const updateCate = await Category.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(updateCate);
  } catch (er) {
    throw new Error(er);
  }
});

const getACategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const getaCate = await Category.findById(id, req.body, {
      new: true,
    });
    res.json(getaCate);
  } catch (er) {
    throw new Error(er);
  }
});
const getAllCategory = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // validDateMongodbId(id);
  try {
    const getaCate = await Category.find();
    res.json(getaCate);
  } catch (er) {
    throw new Error(er);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getACategory,
  getAllCategory,
};
