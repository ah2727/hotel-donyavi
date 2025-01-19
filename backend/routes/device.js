const express = require('express');
const DeviceController = require('../controllers/device');

const router = express.Router();

// Create a new Device
router.post('/', DeviceController.create);

// Retrieve all Devices
router.get('/', DeviceController.getAll);

// Retrieve a Device by ID
router.get('/:id', DeviceController.getById);

// Update a Device by ID
router.put('/:id', DeviceController.update);

// Delete a Device by ID
router.delete('/:id', DeviceController.delete);

module.exports = router;