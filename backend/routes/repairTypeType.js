// routes/repairTypeTypeRoutes.js
const express = require("express");
const router = express.Router();
const repairTypeTypeController = require("../controllers/repairTypeType");

// Create a new RepairTypeType
router.post("/", repairTypeTypeController.createRepairTypeType);

// Get all RepairTypeTypes
router.get("/", repairTypeTypeController.getAllRepairTypeTypes);

// Get a specific RepairTypeType by id
router.get("/:id", repairTypeTypeController.getRepairTypeTypeById);

// Update a RepairTypeType by id
router.put("/:id", repairTypeTypeController.updateRepairTypeType);

// Delete a RepairTypeType by id
router.delete("/:id", repairTypeTypeController.deleteRepairTypeType);

module.exports = router;
