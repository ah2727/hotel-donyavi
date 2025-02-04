// controllers/placesController.js
const { placesService, mainPlaceService, subPlaceService } = require('../services/places');


const placesController = {
  // Create a new place
  createPlace: async (req, res) => {
    try {
      const newPlace = await placesService.createPlace(req.body);
      return res.status(201).json({ data: newPlace });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: error.message || "Failed to create place" });
    }
  },

  // Get all places
  getAllPlaces: async (req, res) => {
    try {
      const places = await placesService.getAllPlaces();
      return res.status(200).json({ data: places });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: error.message || "Failed to retrieve places" });
    }
  },

  // Get a single place by ID
  getPlaceById: async (req, res) => {
    try {
      const place = await placesService.getPlaceById(req.params.id);
      return res.status(200).json({ data: place });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ message: error.message || "Place not found" });
    }
  },

  // Update a place by ID
  updatePlace: async (req, res) => {
    try {
      const updatedPlace = await placesService.updatePlace(
        req.params.id,
        req.body
      );
      return res.status(200).json({ data: updatedPlace });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: error.message || "Failed to update place" });
    }
  },

  // Delete a place by ID
  deletePlace: async (req, res) => {
    try {
      const result = await placesService.deletePlace(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: error.message || "Failed to delete place" });
    }
  },
};

// controllers/MainPlaceController.js

class MainPlaceController {
  async create(req, res) {
    try {
      const mainPlace = await mainPlaceService.createMainPlace(req.body);
      return res.status(201).json(mainPlace);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const mainPlaces = await mainPlaceService.getAllMainPlaces();
      return res.json(mainPlaces);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const mainPlace = await mainPlaceService.getMainPlaceById(req.params.id);
      if (!mainPlace) {
        return res.status(404).json({ error: "MainPlace not found" });
      }
      return res.json(mainPlace);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const mainPlace = await mainPlaceService.updateMainPlace(
        req.params.id,
        req.body
      );
      return res.json(mainPlace);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await mainPlaceService.deleteMainPlace(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
class SubPlaceController {
  async createSubPlace(req, res) {
    try {
      const newSubPlace = await subPlaceService.createsubPlace(req.body);
      res.status(201).json(newSubPlace);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllSubPlaces(req, res) {
    try {
      const subPlaces = await subPlaceService.getAllsubPlaces();
      res.json(subPlaces);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSubPlaceById(req, res) {
    try {
      const subPlace = await subPlaceService.getsubPlaceById(req.params.id);
      if (!subPlace) return res.status(404).json({ error: 'SubPlace not found' });
      res.json(subPlace);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSubPlace(req, res) {
    try {
      const updatedSubPlace = await subPlaceService.updatesubPlace(req.params.id, req.body);
      res.json(updatedSubPlace);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSubPlace(req, res) {
    try {
      const result = await subPlaceService.deletesubPlace(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = {
  placesController,
  MainPlaceController: new MainPlaceController(),
  SubPlaceController: new SubPlaceController(),

};
