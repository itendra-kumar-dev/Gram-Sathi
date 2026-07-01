const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify Token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Get User (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      console.error("JWT Error:", error);

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: "No token provided",
  });
};

module.exports = {
  protect,
};