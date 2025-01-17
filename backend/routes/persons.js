const express = require('express');
const PersonController = require('../controllers/persons');

const router = express.Router();

// Create a new Person
router.post('/persons', PersonController.create);

// Retrieve all People
router.get('/persons', PersonController.getAll);

// Retrieve a Person by ID
router.get('/persons/:id', PersonController.getById);

// Update a Person by ID
router.put('/persons/:id', PersonController.update);

// Delete a Person by ID
router.delete('/persons/:id', PersonController.delete);

module.exports = router;
