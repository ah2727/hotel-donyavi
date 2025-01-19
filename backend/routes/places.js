// routes/placesRoutes.js
const express = require('express');
const placesController = require('../controllers/places');

const router = express.Router();

// Route Definitions
router.get('/', placesController.getAllPlaces);          // Get all places
router.get('/:id', placesController.getPlaceById);       // Get place by ID
router.post('/', placesController.createPlace);          // Create a new place
router.put('/:id', placesController.updatePlace);        // Update place by ID
router.delete('/:id', placesController.deletePlace);     // Delete place by ID

module.exports = router;