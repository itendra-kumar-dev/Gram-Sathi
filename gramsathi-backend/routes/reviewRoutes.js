const express =
require("express");

const router =
express.Router();

const {
  addReview,
  getReviews,
} = require(
  "../controllers/reviewController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  clientOnly,
} = require(
  "../middleware/roleMiddleware"
);

router.post(
  "/",
  protect,
  clientOnly,
  addReview
);

router.get(
  "/:id",
  getReviews
);

module.exports = router;