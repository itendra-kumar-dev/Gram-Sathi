const express = require("express");

const router = express.Router();

const {
  addEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} = require(
  "../controllers/equipmentController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  sellerOnly,
} = require(
  "../middleware/roleMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

// Public Routes

router.get(
  "/",
  getEquipments
);

router.get(
  "/:id",
  getEquipmentById
);

// Seller Routes

router.post(
  "/",
  protect,
  sellerOnly,
  upload.single("image"),
  addEquipment
);

router.put(
  "/:id",
  protect,
  sellerOnly,
  upload.single("image"),
  updateEquipment
);

router.delete(
  "/:id",
  protect,
  sellerOnly,
  deleteEquipment
);

module.exports = router;