const express = require("express");

const router = express.Router();

const {
  addEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  myListings,
  toggleAvailability,
  getRelatedEquipments,
} = require("../controllers/equipmentController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// ======================================
// Public Routes
// ======================================

// Get All Equipments
router.get("/", getEquipments);

// Get Single Equipment
router.get("/:id", getEquipmentById);

// Get Related Equipments
router.get("/related/:id", getRelatedEquipments);

// ======================================
// Protected Routes
// ======================================

// Add Equipment
router.post(
  "/",
  protect,
  upload.array("images", 5),
  addEquipment
);

// Update Equipment
router.put(
  "/:id",
  protect,
  upload.array("images", 5),
  updateEquipment
);

// Delete Equipment
router.delete(
  "/:id",
  protect,
  deleteEquipment
);

// My Listings
router.get(
  "/my-listings",
  protect,
  myListings
);

// Toggle Availability
router.put(
  "/toggle/:id",
  protect,
  toggleAvailability
);

module.exports = router;