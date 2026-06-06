const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getSellerBookings,
  updateBookingStatus,
  cancelBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");
const { sellerOnly } = require("../middleware/roleMiddleware");

// Client routes
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.patch("/:id/cancel", protect, cancelBooking);

// Seller routes
router.get("/seller", protect, sellerOnly, getSellerBookings);
router.patch("/:id/status", protect, sellerOnly, updateBookingStatus);

module.exports = router;
