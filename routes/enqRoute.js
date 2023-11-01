const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  getAEnquiry,
  deleteEnquiry,
  getAllEnquiry,
} = require("../controllers/enqCtr");
// const { authMiddleware, isAdmin } = require("../middlewears/authMiddleware");
const router = express.Router();

router.post("/", createEnquiry);
router.put("/:id", updateEnquiry);
router.delete("/:id", deleteEnquiry);
router.get("/:id", getAEnquiry);
router.get("/", getAllEnquiry);

module.exports = router;
