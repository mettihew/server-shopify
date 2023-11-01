const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const validDateMongodbId = require("../utils/validDateMongodbId");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (er) {
    throw new Error(er);
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const updateCate = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCate);
  } catch (er) {
    throw new Error(er);
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const updateCate = await Color.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(updateCate);
  } catch (er) {
    throw new Error(er);
  }
});

const getAColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const getaCate = await Color.findById(id, req.body, {
      new: true,
    });
    res.json(getaCate);
  } catch (er) {
    throw new Error(er);
  }
});
const getAllColor = asyncHandler(async (req, res) => {
  try {
    const getaCate = await Color.find();
    res.json(getaCate);
  } catch (er) {
    throw new Error(er);
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getAColor,
  getAllColor,
};
