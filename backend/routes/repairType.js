// routes/repairTypeRoutes.js
const express = require("express");
const router = express.Router();
const repairTypeController = require("../controllers/repairType");

// Create a new RepairType
router.post("/", (req, res) => repairTypeController.createRepairType(req, res));

// Get all RepairTypes
router.get("/", (req, res) => repairTypeController.getRepairTypes(req, res));

// Get a RepairType by ID
router.get("/:id", (req, res) => repairTypeController.getRepairTypeById(req, res));

// Update a RepairType by ID
router.put("/:id", (req, res) => repairTypeController.updateRepairType(req, res));

// Delete a RepairType by ID
router.delete("/:id", (req, res) => repairTypeController.deleteRepairType(req, res));

module.exports = router;
