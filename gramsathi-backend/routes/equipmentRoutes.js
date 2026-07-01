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

// Get Related Equipments
router.get("/related/:id", getRelatedEquipments);

// ======================================
// Protected Routes
// ======================================

// My Listings
router.get("/my-listings", protect, myListings);

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

// Toggle Availability
router.put(
  "/toggle/:id",
  protect,
  toggleAvailability
);

// ======================================
// Keep Dynamic Route LAST
// ======================================

// Get Single Equipment
router.get("/:id", getEquipmentById);

module.exports = router;