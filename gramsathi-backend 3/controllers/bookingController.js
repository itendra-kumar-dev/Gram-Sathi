const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { equipmentId, startDate, endDate, message } = req.body;

    if (!equipmentId || !startDate || !endDate) {
      return res.status(400).json({ message: "equipmentId, startDate, and endDate are required" });
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res.status(400).json({ message: "endDate must be after startDate" });
    }

    // Calculate total price (days * rentPrice)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * equipment.rentPrice;

    const booking = await Booking.create({
      equipmentId,
      clientId: req.user._id,
      startDate: start,
      endDate: end,
      totalPrice,
      message: message || "",
    });

    await booking.populate("equipmentId", "title rentPrice");

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Bookings for Logged-in Client
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ clientId: req.user._id })
      .populate("equipmentId", "title category rentPrice image")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Bookings for Seller's Equipment
const getSellerBookings = async (req, res) => {
  try {
    const sellerEquipments = await Equipment.find({ sellerId: req.user._id }).select("_id");
    const equipmentIds = sellerEquipments.map((e) => e._id);

    const bookings = await Booking.find({ equipmentId: { $in: equipmentIds } })
      .populate("equipmentId", "title rentPrice")
      .populate("clientId", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Booking Status (Seller only)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["confirmed", "cancelled", "completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(req.params.id).populate("equipmentId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.equipmentId.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Booking (Client only)
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getSellerBookings,
  updateBookingStatus,
  cancelBooking,
};
