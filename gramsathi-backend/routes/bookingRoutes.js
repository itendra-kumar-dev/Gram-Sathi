const express = require("express");

const router = express.Router();

const {
  createBooking,
  approveBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
  myBookings,
  bookingRequests,
} = require("../controllers/bookingController");

const {
  protect,
} = require("../middleware/authMiddleware");

// ==========================
// Booking Routes
// ==========================

// Create Booking
router.post(
  "/book",
  protect,
  createBooking
);

// My Bookings
router.get(
  "/my-bookings",
  protect,
  myBookings
);

// Booking Requests (Owner)
router.get(
  "/requests",
  protect,
  bookingRequests
);

// Approve Booking
router.put(
  "/approve/:id",
  protect,
  approveBooking
);

// Reject Booking
router.put(
  "/reject/:id",
  protect,
  rejectBooking
);

// Cancel Booking
router.put(
  "/cancel/:id",
  protect,
  cancelBooking
);

// Complete Booking
router.put(
  "/complete/:id",
  protect,
  completeBooking
);

module.exports = router;