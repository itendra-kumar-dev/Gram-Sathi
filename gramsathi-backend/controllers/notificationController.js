const mongoose = require("mongoose");
const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .limit(100);
    const unreadCount = await Notification.countDocuments({
      recipient: req.user.id,
      readAt: null,
    });

    res.status(200).json({ success: true, notifications, unreadCount });
  } catch (error) {
    console.error("Unable to load notifications:", error);
    res.status(500).json({ success: false, message: "Unable to load notifications." });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ success: false, message: "Invalid notification." });
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.id },
      { $set: { readAt: new Date() } },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found." });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error("Unable to update notification:", error);
    res.status(500).json({ success: false, message: "Unable to update notification." });
  }
};

const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, readAt: null },
      { $set: { readAt: new Date() } }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Unable to mark notifications as read:", error);
    res.status(500).json({ success: false, message: "Unable to update notifications." });
  }
};

module.exports = { getNotifications, markNotificationRead, markAllNotificationsRead };