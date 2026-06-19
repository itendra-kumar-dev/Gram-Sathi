const Review =
require("../models/Review");

const Equipment =
require("../models/Equipment");


// Add Review

const addReview =
async (req, res) => {

  try {

    const {
      equipmentId,
      rating,
      comment,
    } = req.body;

    const existingReview =
      await Review.findOne({
        equipmentId,
        clientId:
          req.user._id,
      });

    if (existingReview) {

      return res.status(400).json({
        message:
          "You already reviewed this equipment",
      });

    }

    const review =
      await Review.create({
        equipmentId,
        clientId:
          req.user._id,
        rating,
        comment,
      });

    const reviews =
      await Review.find({
        equipmentId,
      });

    const totalRatings =
      reviews.reduce(
        (sum, item) =>
          sum + item.rating,
        0
      );

    const averageRating =
      totalRatings /
      reviews.length;

    await Equipment.findByIdAndUpdate(
      equipmentId,
      {
        averageRating,
        totalReviews:
          reviews.length,
      }
    );

    res.status(201).json(
      review
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};


// Get Reviews

const getReviews =
async (req, res) => {

  try {

    const reviews =
      await Review.find({
        equipmentId:
          req.params.id,
      })
      .populate(
        "clientId",
        "name"
      );

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

module.exports = {
  addReview,
  getReviews,
};