const Review = require("../models/Review");
const Equipment = require("../models/Equipment");

// Add Review

const addReview = async (req, res) => {

  try {

    const {
      equipmentId,
      rating,
      comment,
    } = req.body;

    const review = await Review.create({

      equipment: equipmentId,

      user: req.user.id,

      rating,

      comment,

    });

    const reviews = await Review.find({
      equipment: equipmentId,
    });

    const average =
      reviews.reduce(
        (sum, item) => sum + item.rating,
        0
      ) / reviews.length;

    await Equipment.findByIdAndUpdate(
      equipmentId,
      {
        rating: average,
        reviews: reviews.length,
      }
    );

    res.status(201).json({
      success: true,
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get Reviews

const getReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      equipment: req.params.id,
    }).populate(
      "user",
      "name"
    );

    res.json({
      success: true,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Delete Review

const deleteReview = async (req, res) => {

  try {

    const review =
      await Review.findById(
        req.params.id
      );

    if (!review) {

      return res.status(404).json({
        success: false,
        message: "Review not found",
      });

    }

    if (
      review.user.toString() !==
      req.user.id
    ) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    }

    await review.deleteOne();

    res.json({
      success: true,
      message: "Review deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {

  addReview,

  getReviews,

  deleteReview,

};