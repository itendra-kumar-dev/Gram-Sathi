const express = require("express");

const router = express.Router();

const {
  askAI,
} = require(
  "../controllers/aiController"
);

router.post(
  "/recommend",
  askAI
);

module.exports = router;