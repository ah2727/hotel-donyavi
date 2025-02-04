// routes/placesRoutes.js
const express = require('express');
const { placesController, MainPlaceController,SubPlaceController } = require('../controllers/places');


const router = express.Router();

// Route Definitions
router.get('/place', placesController.getAllPlaces);          // Get all places
router.get('/place/:id', placesController.getPlaceById);       // Get place by ID
router.post('/place/', placesController.createPlace);          // Create a new place
router.put('/place/:id', placesController.updatePlace);        // Update place by ID
router.delete('/place/:id', placesController.deletePlace);     // Delete place by ID
// === MainPlace Routes (prefixed with /mainplace) ===
router.post('/mainplace', MainPlaceController.create.bind(MainPlaceController));
router.get('/mainplace', MainPlaceController.getAll.bind(MainPlaceController));
router.get('/mainplace/:id', MainPlaceController.getById.bind(MainPlaceController));
router.put('/mainplace/:id', MainPlaceController.update.bind(MainPlaceController));
router.delete('/mainplace/:id', MainPlaceController.delete.bind(MainPlaceController))
// === SubPlace Routes (prefixed with /subplace) ===
router.post('/subplace', SubPlaceController.createSubPlace.bind(SubPlaceController));
router.get('/subplace', SubPlaceController.getAllSubPlaces.bind(SubPlaceController));
router.get('/subplace/:id', SubPlaceController.getSubPlaceById.bind(SubPlaceController));
router.put('/subplace/:id', SubPlaceController.updateSubPlace.bind(SubPlaceController));
router.delete('/subplace/:id', SubPlaceController.deleteSubPlace.bind(SubPlaceController));
module.exports = router;