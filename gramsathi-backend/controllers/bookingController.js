const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");


// Create Booking
const createBooking = async (
  req,
  res
) => {
  try {

    const {
      equipmentId,
      startDate,
      endDate,
    } = req.body;

    const equipment =
      await Equipment.findById(
        equipmentId
      );

    if (!equipment) {
      return res.status(404).json({
        message:
          "Equipment not found",
      });
    }

    const booking =
      await Booking.create({
        equipmentId,
        clientId:
          req.user._id,
        sellerId:
          equipment.sellerId,
        startDate,
        endDate,
      });

    res.status(201).json(
      booking
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};


// Client Booking History
const getMyBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({
          clientId:
            req.user._id,
        }).populate(
          "equipmentId"
        );

      res.json(bookings);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};


// Seller Booking Requests
const getSellerBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({
          sellerId:
            req.user._id,
        })
          .populate(
            "equipmentId"
          )
          .populate(
            "clientId",
            "name email"
          );

      res.json(bookings);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};


// Approve Booking
const approveBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404)
          .json({
            message:
              "Booking not found",
          });

      }

      booking.status =
        "approved";

      await booking.save();

      res.json(booking);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};


// Reject Booking
const rejectBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404)
          .json({
            message:
              "Booking not found",
          });

      }

      booking.status =
        "rejected";

      await booking.save();

      res.json(booking);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

module.exports = {
  createBooking,
  getMyBookings,
  getSellerBookings,
  approveBooking,
  rejectBooking,
};