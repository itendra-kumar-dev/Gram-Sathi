const express = require("express");

const router = express.Router();

const {
  sellerDashboard,
  clientDashboard,
} = require(
  "../controllers/dashboardController"
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

router.get(
  "/seller",
  protect,
  sellerOnly,
  sellerDashboard
);

router.get(
  "/client",
  protect,
  clientOnly,
  clientDashboard
);

module.exports = router;