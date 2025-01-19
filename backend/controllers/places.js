// controllers/placesController.js
const placesService = require('../services/places');

const placesController = {
  // Create a new place
  createPlace: async (req, res) => {
    try {
      const newPlace = await placesService.createPlace(req.body);
      return res.status(201).json({data:newPlace});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message || 'Failed to create place' });
    }
  },

  // Get all places
  getAllPlaces: async (req, res) => {
    try {
      const places = await placesService.getAllPlaces();
      return res.status(200).json({data:places});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message || 'Failed to retrieve places' });
    }
  },

  // Get a single place by ID
  getPlaceById: async (req, res) => {
    try {
      const place = await placesService.getPlaceById(req.params.id);
      return res.status(200).json(place);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: error.message || 'Place not found' });
    }
  },

  // Update a place by ID
  updatePlace: async (req, res) => {
    try {
      const updatedPlace = await placesService.updatePlace(req.params.id, req.body);
      return res.status(200).json(updatedPlace);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message || 'Failed to update place' });
    }
  },

  // Delete a place by ID
  deletePlace: async (req, res) => {
    try {
      const result = await placesService.deletePlace(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message || 'Failed to delete place' });
    }
  },
};

module.exports = placesController;
