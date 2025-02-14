const express = require("express");
const { EquipmentTypeController } = require("../controllers/Equipment");
const { EquipmentController } = require("../controllers/Equipment");

const router = express.Router();

// Create a new EquipmentType
router.post("/equipment-types", EquipmentTypeController.create);

// Retrieve all EquipmentTypes
router.get("/equipment-types", EquipmentTypeController.getAll);

router.get("/get-arborist", (req, res) => EquipmentController.fetchEquipment(req, res));

// Retrieve an EquipmentType by ID
router.get("/equipment-types/:id", EquipmentTypeController.getById);

// Update an EquipmentType by ID
router.put("/equipment-types/:id", EquipmentTypeController.update);

// Delete an EquipmentType by ID
router.delete("/equipment-types/:id", EquipmentTypeController.delete);

// Create a new Equipment
router.post("/equipment", EquipmentController.create);

// Retrieve all Equipment
router.get("/equipment", EquipmentController.getAll);

// Retrieve an Equipment by ID
router.get("/equipment/:id", EquipmentController.getById);

// Update an Equipment by ID
router.put("/equipment/:id", EquipmentController.update);

// Delete an Equipment by ID
router.delete("/equipment/:id", EquipmentController.delete);

module.exports = router;
