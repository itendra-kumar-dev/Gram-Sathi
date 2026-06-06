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

    rentPrice: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
mongoose.model(
  "Equipment",
  equipmentSchema
);