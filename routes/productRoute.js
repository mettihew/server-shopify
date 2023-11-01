const router = require("express").Router();
const {
  createProduct,
  getAProduct,
  getAllProducts,
  updateAProduct,
  deleteAProduct,
  addToWishList,
  rating,
} = require("../controllers/ProductCrt");
const { isAdmin, authMiddleware } = require("../middlewears/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewears/uploadImages");

router.post("/", createProduct);

router.get("/:id", getAProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateAProduct);
router.delete("/:id", deleteAProduct);
router.get("/", getAllProducts);

module.exports = router;
