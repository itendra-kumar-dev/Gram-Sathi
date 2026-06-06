const Equipment =
require("../models/Equipment");


// Add Equipment

const addEquipment =
async (req, res) => {

  try {

    const {
      title,
      description,
      category,
      rentPrice,
      image,
    } = req.body;

    const equipment =
      await Equipment.create({
        title,
        description,
        category,
        rentPrice,
        image,
        sellerId:
          req.user._id,
      });

    res.status(201).json(
      equipment
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};


// Get All Equipments

const getEquipments =
async (req, res) => {

  try {

    const equipments =
      await Equipment.find()
        .populate(
          "sellerId",
          "name email"
        );

    res.json(equipments);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};


// Get Single Equipment

const getEquipmentById =
async (req, res) => {

  try {

    const equipment =
      await Equipment.findById(
        req.params.id
      );

    if (!equipment) {

      return res.status(404)
        .json({
          message:
            "Equipment not found",
        });

    }

    res.json(equipment);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};


// Update Equipment

const updateEquipment =
async (req, res) => {

  try {

    const equipment =
      await Equipment.findById(
        req.params.id
      );

    if (!equipment) {

      return res.status(404)
        .json({
          message:
            "Equipment not found",
        });

    }

    if (
      equipment.sellerId.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403)
        .json({
          message:
            "Not Authorized",
        });

    }

    const updated =
      await Equipment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};


// Delete Equipment

const deleteEquipment =
async (req, res) => {

  try {

    const equipment =
      await Equipment.findById(
        req.params.id
      );

    if (!equipment) {

      return res.status(404)
        .json({
          message:
            "Equipment not found",
        });

    }

    if (
      equipment.sellerId.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403)
        .json({
          message:
            "Not Authorized",
        });

    }

    await equipment.deleteOne();

    res.json({
      message:
        "Equipment deleted",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

module.exports = {
  addEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
};