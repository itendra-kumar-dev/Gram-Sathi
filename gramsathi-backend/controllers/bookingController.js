const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");

// ===============================
// Create Booking
// ===============================

const createBooking = async (req, res) => {
  try {

    const {
      equipmentId,
      bookingStartDate,
      bookingEndDate,
      pickupTime,
      returnTime,
    } = req.body;

    // Check Equipment
    const equipment = await Equipment.findById(equipmentId);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    // Owner cannot book own equipment
    if (equipment.owner.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot book your own equipment.",
      });
    }

    // ===============================
    // Date Overlap Check
    // ===============================

    const overlapBooking = await Booking.findOne({

      equipment: equipmentId,

      status: {
        $in: [
          "Pending",
          "Approved",
        ],
      },

      bookingStartDate: {
        $lte: bookingEndDate,
      },

      bookingEndDate: {
        $gte: bookingStartDate,
      },

    });

    if (overlapBooking) {

      return res.status(400).json({

        success: false,

        message:
          "Equipment is already booked for the selected dates.",

      });

    }

    // ===============================
    // Rent Calculation
    // ===============================

    const startDate = new Date(bookingStartDate);

    const endDate = new Date(bookingEndDate);

    const totalDays =
      Math.ceil(
        (endDate - startDate) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    if (totalDays <= 0) {

      return res.status(400).json({
        success: false,
        message: "Invalid booking dates.",
      });

    }

    const totalAmount =
      totalDays *
      equipment.pricePerDay;

    // ===============================
    // Create Booking
    // ===============================

    const booking =
      await Booking.create({

        equipment: equipment._id,

        owner: equipment.owner,

        renter: req.user.id,

        bookingStartDate,

        bookingEndDate,

        pickupTime,

        returnTime,

        totalAmount,

        status: "Pending",

        paymentStatus: "Pending",

      });

    res.status(201).json({

      success: true,

      message:
        "Booking request sent successfully.",

      booking,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ===================================
// Approve Booking
// ===================================

const approveBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only owner can approve booking
    if (booking.owner.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = "Approved";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking approved successfully.",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ===================================
// Reject Booking
// ===================================

const rejectBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = "Rejected";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking rejected.",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ===================================
// Cancel Booking
// ===================================

const cancelBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only renter can cancel
    if (booking.renter.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ===================================
// Complete Booking
// ===================================

const completeBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = "Completed";

    booking.paymentStatus = "Paid";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking completed successfully.",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ===================================
// My Bookings
// ===================================

const myBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      renter: req.user.id,
    })
      .populate("equipment")
      .populate("owner", "name email");

    res.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ===================================
// Booking Requests
// ===================================

const bookingRequests = async (req, res) => {
  try {

    const bookings = await Booking.find({
      owner: req.user.id,
    })
      .populate("equipment")
      .populate("renter", "name email");

    res.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  createBooking,
  approveBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
  myBookings,
  bookingRequests,
};