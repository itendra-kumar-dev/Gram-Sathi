const Equipment = require("../models/Equipment");
const Booking = require("../models/Booking");

const getDashboard = async (req, res) => {
  try {

    const totalEquipment = await Equipment.countDocuments({
      owner: req.user.id,
    });

    const totalBookings = await Booking.countDocuments({
      renter: req.user.id,
    });

    const bookingRequests = await Booking.countDocuments({
      owner: req.user.id,
      status: "Pending",
    });

    const activeRentals = await Booking.countDocuments({
      owner: req.user.id,
      status: "Approved",
    });

    const revenueData = await Booking.find({
      owner: req.user.id,
      status: "Completed",
    });

    const totalRevenue = revenueData.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    const recentBookings = await Booking.find({
      owner: req.user.id,
    })
      .populate("equipment", "title")
      .populate("renter", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      dashboard: {
        totalEquipment,
        totalBookings,
        bookingRequests,
        activeRentals,
        totalRevenue,
        recentBookings,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
};