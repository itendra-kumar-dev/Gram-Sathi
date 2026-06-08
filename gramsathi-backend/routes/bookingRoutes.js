const express =
require("express");

const router =
express.Router();

const {
  createBooking,
  getMyBookings,
  getSellerBookings,
  approveBooking,
  rejectBooking,
} = require(
  "../controllers/bookingController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  sellerOnly,
  clientOnly,
} = require(
  "../middleware/roleMiddleware"
);


// Client Routes

router.post(
  "/",
  protect,
  clientOnly,
  createBooking
);

router.get(
  "/my",
  protect,
  clientOnly,
  getMyBookings
);


// Seller Routes

router.get(
  "/seller",
  protect,
  sellerOnly,
  getSellerBookings
);

router.put(
  "/:id/approve",
  protect,
  sellerOnly,
  approveBooking
);

router.put(
  "/:id/reject",
  protect,
  sellerOnly,
  rejectBooking
);

module.exports = router;