const Product = require("../models/productModel");
const validDateMongodbId = require("../utils/validDateMongodbId");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const updateAProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const UP = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(UP);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteAProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const del = await Product.findByIdAndDelete(id);
    res.json(del);
  } catch (err) {
    throw new Error(err);
  }
});

const getAProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await Product.findById(id).populate("color");
    console.log(findProduct);
    res.json(findProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fileds"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //field
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");

      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination
    console.log(req.query);

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const bitch = await Product.countDocuments;
      if (skip >= bitch) throw new Error("This page does not exist");
    }

    const pp = await query;
    res.json(pp);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;

  try {
    const ourUser = await User.findById(_id);
    const alreadyAdded = ourUser.wishlist.find(
      (id) => id.toString() === prodId
    );
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  console.log(req.body);

  try {
    const productBitch = await Product.findById(prodId);
    let alreadyRated = productBitch.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
    }
    const getAllRating = await Product.findById(prodId);
    let totalRating = getAllRating.ratings.length;
    let ratingsum = getAllRating.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRaitng = Math.round(ratingsum / totalRating);
    let finalProdct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRating: actualRaitng,
      },
      { new: true }
    );
    res.json(finalProdct);
  } catch (error) {
    throw new Error(error);
  }
});

// const uploadImages = asyncHandler(async (req, res) => {
//   try {
//     const uploader = (path) => colidanryUpdateImage(path, "images");
//     const urls = [];
//     const files = req.files;
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }
//     const images = urls.map((file) => {
//       return file;
//     });
//     res.json(images);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const deleteImage = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const del = colidanryDeleteImage(id, "images");
//     res.json("deleted");
//   } catch (error) {
//     throw new Error(error);
//   }
// });

module.exports = {
  createProduct,
  getAProduct,
  getAllProducts,
  updateAProduct,
  deleteAProduct,
  addToWishList,
  rating,
  // uploadImages,
  // deleteImage,
};
