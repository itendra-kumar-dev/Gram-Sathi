const express =
require("express");

const router =
express.Router();

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

router.get(
  "/",
  getEquipments
);

router.get(
  "/:id",
  getEquipmentById
);

router.post(
  "/",
  protect,
  sellerOnly,
  addEquipment
);

router.put(
  "/:id",
  protect,
  sellerOnly,
  updateEquipment
);

router.delete(
  "/:id",
  protect,
  sellerOnly,
  deleteEquipment
);

module.exports =
router;