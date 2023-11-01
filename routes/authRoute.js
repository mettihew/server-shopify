const router = require("express").Router();
// const { default: CheckOut } = require("../../client/src/pages/CheckOut");
const { paymentVerification } = require("../controllers/paymentCtrl");
const {
  createUser,
  loginUC,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  logOut,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getAllOrders,
  getOrderByUserId,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewears/authMiddleware");

router.post("/register", createUser);

router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.get("/wishlist", authMiddleware, getWishlist);
router.post("/login", loginUC);

router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
// router.post("/cart/cash-order", authMiddleware, createOrder);
// router.get("/getallorders", getAllOrders);
router.get("/getmyorders", authMiddleware, getMyOrders);
// router.get("/getorderbyuser/:id", getOrderByUserId);

// router.post("/order/checkout", authMiddleware, CheckOut);
// router.post("/order/paymentVerification", authMiddleware, paymentVerification);
router.post("/cart/create-order", authMiddleware, createOrder);
router.delete("/cart/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);

router.post("/admin-login", loginAdmin);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logOut);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.put("/save-address", authMiddleware, saveAddress);
router.delete("/:id", deleteAUser);
router.put("/edit-user/:id", authMiddleware, updateAUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
