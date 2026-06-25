const Equipment = require("../models/Equipment");

// ======================================
// Add Equipment
// ======================================

const addEquipment = async (req, res) => {
  try {

    const {
      title,
      description,
      category,
      brand,
      pricePerDay,
      securityDeposit,
      location,
      district,
      state,
      availableFrom,
      availableTo,
      availableTimeStart,
      availableTimeEnd,
    } = req.body;

    const images = [];

    if (req.files && req.files.length > 0) {

      req.files.forEach((file) => {

        images.push({
          url: file.path,
          public_id: file.filename,
        });

      });

    }

    const equipment = await Equipment.create({

      title,

      description,

      category,

      brand,

      pricePerDay,

      securityDeposit,

      location,

      district,

      state,

      availableFrom,

      availableTo,

      availableTimeStart,

      availableTimeEnd,

      images,

      owner: req.user.id,

    });

    res.status(201).json({

      success: true,

      message: "Equipment Added Successfully",

      equipment,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};

// ======================================
// Get All Equipments
// Advanced Search & Filters
// ======================================

const getEquipments = async (req, res) => {

  try {

    const {

      search,

      category,

      location,

      district,

      state,

      minPrice,

      maxPrice,

      availableDate,

      sort,

    } = req.query;

    let filter = {};

    // ------------------------
    // Search by Equipment Name
    // ------------------------

    if (search) {

      filter.title = {

        $regex: search,

        $options: "i",

      };

    }

    // ------------------------
    // Category
    // ------------------------

    if (category) {

      filter.category = category;

    }

    // ------------------------
    // Location
    // ------------------------

    if (location) {

      filter.location = {

        $regex: location,

        $options: "i",

      };

    }

    if (district) {

      filter.district = {

        $regex: district,

        $options: "i",

      };

    }

    if (state) {

      filter.state = {

        $regex: state,

        $options: "i",

      };

    }

    // ------------------------
    // Price Filter
    // ------------------------

    if (minPrice || maxPrice) {

      filter.pricePerDay = {};

      if (minPrice) {

        filter.pricePerDay.$gte = Number(minPrice);

      }

      if (maxPrice) {

        filter.pricePerDay.$lte = Number(maxPrice);

      }

    }

    // ------------------------
    // Available Date
    // ------------------------

    if (availableDate) {

      filter.availableFrom = {

        $lte: new Date(availableDate),

      };

      filter.availableTo = {

        $gte: new Date(availableDate),

      };

    }

    // ------------------------
    // Sorting
    // ------------------------

    let sortOption = {

      createdAt: -1,

    };

    if (sort === "priceLow") {

      sortOption = {

        pricePerDay: 1,

      };

    }

    if (sort === "priceHigh") {

      sortOption = {

        pricePerDay: -1,

      };

    }

    if (sort === "rating") {

      sortOption = {

        rating: -1,

      };

    }

    if (sort === "latest") {

      sortOption = {

        createdAt: -1,

      };

    }

    const equipments = await Equipment.find(filter)

      .populate("owner", "name phone")

      .sort(sortOption);

    res.status(200).json({

      success: true,

      total: equipments.length,

      equipments,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ======================================
// Update Equipment
// ======================================

const updateEquipment = async (req, res) => {

  try {

    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {

      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });

    }

    // Only Owner Can Update
    if (equipment.owner.toString() !== req.user.id) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    }

    const fields = [

      "title",
      "description",
      "category",
      "brand",
      "pricePerDay",
      "securityDeposit",
      "location",
      "district",
      "state",
      "availableFrom",
      "availableTo",
      "availableTimeStart",
      "availableTimeEnd",

    ];

    fields.forEach((field) => {

      if (req.body[field] !== undefined) {
        equipment[field] = req.body[field];
      }

    });

    // Update Images (Optional)

    if (req.files && req.files.length > 0) {

      equipment.images = [];

      req.files.forEach((file) => {

        equipment.images.push({
          url: file.path,
          public_id: file.filename,
        });

      });

    }

    await equipment.save();

    res.status(200).json({

      success: true,

      message: "Equipment Updated Successfully",

      equipment,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ======================================
// Delete Equipment
// ======================================

const deleteEquipment = async (req, res) => {

  try {

    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {

      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });

    }

    // Only Owner Can Delete

    if (equipment.owner.toString() !== req.user.id) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    }

    await equipment.deleteOne();

    res.status(200).json({

      success: true,

      message: "Equipment Deleted Successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ======================================
// Get My Listings
// ======================================

const myListings = async (req, res) => {
  try {

    const equipments = await Equipment.find({
      owner: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: equipments.length,
      equipments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ======================================
// Toggle Equipment Availability
// ======================================

const toggleAvailability = async (req, res) => {

  try {

    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    if (equipment.owner.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    equipment.isActive = !equipment.isActive;

    await equipment.save();

    res.status(200).json({
      success: true,
      message: "Availability Updated",
      equipment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// ======================================
// Related Equipments
// ======================================

const getRelatedEquipments = async (req, res) => {

  try {

    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {

      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });

    }

    const related = await Equipment.find({

      _id: {
        $ne: equipment._id,
      },

      category: equipment.category,

      isActive: true,

    })

    .limit(4)

    .populate(
      "owner",
      "name"
    );

    res.status(200).json({

      success: true,

      related,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ======================================
// Get Single Equipment
// ======================================

const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate("owner", "name email phone");

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      success: true,
      equipment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  myListings,
  toggleAvailability,
  getRelatedEquipments,
};