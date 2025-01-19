const express = require('express');
const PersonController = require('../controllers/persons');

const router = express.Router();

// Create a new Person
router.post('/', PersonController.create);

// Retrieve all People
router.get('/', PersonController.getAll);

// Retrieve a Person by ID
router.get('/:id', PersonController.getById);

// Update a Person by ID
router.put('/:id', PersonController.update);

// Delete a Person by ID
router.delete('/:id', PersonController.delete);

module.exports = router;
