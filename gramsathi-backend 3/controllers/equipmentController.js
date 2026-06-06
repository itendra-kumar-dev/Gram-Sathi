const Equipment = require("../models/Equipment");

// Add Equipment
const addEquipment = async (req, res) => {
  try {
    const { title, description, category, rentPrice, image } = req.body;

    if (!title || !description || !category || !rentPrice) {
      return res.status(400).json({ message: "title, description, category, and rentPrice are required" });
    }

    const equipment = await Equipment.create({
      title,
      description,
      category,
      rentPrice,
      image,
      sellerId: req.user._id,
    });

    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Equipments
const getEquipments = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.rentPrice = {};
      if (minPrice) filter.rentPrice.$gte = Number(minPrice);
      if (maxPrice) filter.rentPrice.$lte = Number(maxPrice);
    }

    const equipments = await Equipment.find(filter).populate("sellerId", "name email");
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Equipment
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate("sellerId", "name email");

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Equipment
const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    // Prevent sellerId from being changed
    delete req.body.sellerId;

    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Equipment
const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await equipment.deleteOne();

    res.json({ message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
};
