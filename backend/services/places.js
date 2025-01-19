// services/placesService.js
const { Place } = require('../models');

const placesService = {
  // Create a new place
  createPlace: async (data) => {
    try {
      const { name, description, address, latitude, longitude } = data;
      const newPlace = await Place.create({ name, description, address, latitude, longitude });
      return newPlace;
    } catch (error) {
      console.error('Error in placesService.createPlace:', error);
      throw new Error('Failed to create place');
    }
  },

  // Get all places
  getAllPlaces: async () => {
    try {
      return await Place.findAll();
    } catch (error) {
      console.error('Error in placesService.getAllPlaces:', error);
      throw new Error('Failed to fetch places');
    }
  },

  // Get a place by ID
  getPlaceById: async (id) => {
    try {
      const place = await Place.findByPk(id);
      if (!place) throw new Error('Place not found');
      return place;
    } catch (error) {
      console.error('Error in placesService.getPlaceById:', error);
      throw new Error(error.message || 'Failed to fetch place');
    }
  },

  // Update a place by ID
  updatePlace: async (id, data) => {
    try {
      const place = await Place.findByPk(id);
      if (!place) throw new Error('Place not found');

      const updatedPlace = await place.update(data);
      return updatedPlace;
    } catch (error) {
      console.error('Error in placesService.updatePlace:', error);
      throw new Error(error.message || 'Failed to update place');
    }
  },

  // Delete a place by ID
  deletePlace: async (id) => {
    try {
      const place = await Place.findByPk(id);
      if (!place) throw new Error('Place not found');

      await place.destroy();
      return { message: 'Place deleted successfully' };
    } catch (error) {
      console.error('Error in placesService.deletePlace:', error);
      throw new Error(error.message || 'Failed to delete place');
    }
  },
};

module.exports = placesService;
