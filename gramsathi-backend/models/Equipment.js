const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
      required: true,
    },

    district: {
      type: String,
    },

    state: {
      type: String,
    },

    availableFrom: {
      type: Date,
      required: true,
    },

    availableTo: {
      type: Date,
      required: true,
    },

    availableTimeStart: {
      type: String,
    },

    availableTimeEnd: {
      type: String,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Equipment", equipmentSchema);