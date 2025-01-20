const express = require('express');
const DeployedEquipmentController = require('../controllers/DeployedEquipment');

const router = express.Router();

// Create a new DeployedEquipment
router.post('/', DeployedEquipmentController.create);

// Get all DeployedEquipment
router.get('/', DeployedEquipmentController.getAll);

// Get a specific DeployedEquipment by ID
router.get('/:id', DeployedEquipmentController.getById);

// Update a specific DeployedEquipment by ID
router.put('/:id', DeployedEquipmentController.update);

// Delete a specific DeployedEquipment by ID
router.delete('/:id', DeployedEquipmentController.delete);

module.exports = router;
