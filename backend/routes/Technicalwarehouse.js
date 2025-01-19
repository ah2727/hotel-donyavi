const express = require('express');
const technicalWarehouseController = require('../controllers/Technicalwarehouse');

const router = express.Router();

// Create a new item
router.post('/', technicalWarehouseController.create);

// Get all items
router.get('/', technicalWarehouseController.getAll);

// Get a single item by ID
router.get('/:id', technicalWarehouseController.getById);

// Update an item by ID
router.put('/:id', technicalWarehouseController.update);

// Delete an item by ID
router.delete('/:id', technicalWarehouseController.delete);

module.exports = router;
