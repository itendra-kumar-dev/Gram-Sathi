const Equipment = require("../models/Equipment");
const Booking = require("../models/Booking");

const sellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const totalEquipments =
      await Equipment.countDocuments({
        sellerId,
      });

    const totalBookings =
      await Booking.countDocuments({
        sellerId,
      });

    const approvedBookings =
      await Booking.countDocuments({
        sellerId,
        status: "approved",
      });

    const pendingBookings =
      await Booking.countDocuments({
        sellerId,
        status: "pending",
      });

    res.status(200).json({
      totalEquipments,
      totalBookings,
      approvedBookings,
      pendingBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const clientDashboard = async (req, res) => {
  try {
    const clientId = req.user._id;

    const totalBookings =
      await Booking.countDocuments({
        clientId,
      });

    const approvedBookings =
      await Booking.countDocuments({
        clientId,
        status: "approved",
      });

    const pendingBookings =
      await Booking.countDocuments({
        clientId,
        status: "pending",
      });

    res.status(200).json({
      totalBookings,
      approvedBookings,
      pendingBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sellerDashboard,
  clientDashboard,
};