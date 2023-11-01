const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");
const validDateMongodbId = require("../utils/validDateMongodbId");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (er) {
    throw new Error(er);
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const updateCate = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCate);
  } catch (er) {
    throw new Error(er);
  }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const updateCate = await Enquiry.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(updateCate);
  } catch (er) {
    throw new Error(er);
  }
});

const getAEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validDateMongodbId(id);
  try {
    const getaCate = await Enquiry.findById(id, req.body, {
      new: true,
    });
    res.json(getaCate);
  } catch (er) {
    throw new Error(er);
  }
});
const getAllEnquiry = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // validDateMongodbId(id);
  try {
    const getaCate = await Enquiry.find();
    res.json(getaCate);
  } catch (er) {
    throw new Error(er);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAEnquiry,
  getAllEnquiry,
};
