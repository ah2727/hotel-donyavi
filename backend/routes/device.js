const express = require('express');
const DeviceController = require('../controllers/device');

const router = express.Router();

// Create a new Device
router.post('/devices', DeviceController.create);

// Retrieve all Devices
router.get('/devices', DeviceController.getAll);

// Retrieve a Device by ID
router.get('/devices/:id', DeviceController.getById);

// Update a Device by ID
router.put('/devices/:id', DeviceController.update);

// Delete a Device by ID
router.delete('/devices/:id', DeviceController.delete);

module.exports = router;