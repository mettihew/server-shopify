const jwt = require("jsonwebtoken");

const grefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

module.exports = { grefreshToken };
