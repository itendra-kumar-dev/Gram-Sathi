const mongoose = require("mongoose");
const Equipment = require("../models/Equipment");
const Notification = require("../models/Notification");
const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("equipment");

    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error("Unable to load wishlist:", error);
    res.status(500).json({ success: false, message: "Unable to load wishlist." });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { equipmentId } = req.body;

    if (!mongoose.isValidObjectId(equipmentId)) {
      return res.status(422).json({ success: false, message: "Invalid equipment." });
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment || !equipment.isActive) {
      return res.status(404).json({ success: false, message: "Equipment not found." });
    }

    let wishlistItem = await Wishlist.findOne({ user: req.user.id, equipment: equipment._id });
    let wasAdded = false;

    if (!wishlistItem) {
      try {
        wishlistItem = await Wishlist.create({ user: req.user.id, equipment: equipment._id });
        wasAdded = true;
      } catch (error) {
        if (error.code !== 11000) throw error;
        wishlistItem = await Wishlist.findOne({ user: req.user.id, equipment: equipment._id });
      }
    }

    if (!wishlistItem) {
      return res.status(409).json({ success: false, message: "Wishlist update conflicted. Please try again." });
    }

    if (wasAdded && String(equipment.owner) !== String(req.user.id)) {
      await Notification.create({
        recipient: equipment.owner,
        type: "wishlist_added",
        title: "Equipment added to a wishlist",
        message: `Someone added ${equipment.title} to their wishlist.`,
        link: "/my-listings",
      });
    }

    await wishlistItem.populate("equipment");
    res.status(200).json({ success: true, wishlistItem });
  } catch (error) {
    console.error("Unable to add equipment to wishlist:", error);
    res.status(500).json({ success: false, message: "Unable to add equipment to wishlist." });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { equipmentId } = req.params;

    if (!mongoose.isValidObjectId(equipmentId)) {
      return res.status(422).json({ success: false, message: "Invalid equipment." });
    }

    await Wishlist.findOneAndDelete({ user: req.user.id, equipment: equipmentId });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Unable to remove equipment from wishlist:", error);
    res.status(500).json({ success: false, message: "Unable to remove equipment from wishlist." });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };