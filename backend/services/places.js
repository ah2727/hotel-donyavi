// services/placesService.js
const { where } = require("sequelize");
const { Place } = require("../models");
const { MainPlace } = require("../models");
const { subPlace } = require("../models");

const placesService = {
  // Create a new place
  createPlace: async (data) => {
    try {
      const { name, selectedMainPlace, selectedSubPlace } = data;
      const newPlace = await Place.create({
        name,
      });
      const subplaceInstance = await subPlace.findOne({
        where: { id: selectedSubPlace },
      });
      const mainPlaceInstance = await MainPlace.findOne({
        where: { id: selectedMainPlace },
      });
      await newPlace.setMainPlace(mainPlaceInstance);
      await newPlace.setSubPlace(subplaceInstance);
      const newPlaceRes = await Place.findByPk(newPlace.id, {
        include: [
          { model: MainPlace, as: "mainPlace", attributes: ["id", "name"] },
          { model: subPlace, as: "subPlace", attributes: ["id", "name"] },
        ],
      });
      return newPlaceRes;
    } catch (error) {
      console.error("Error in placesService.createPlace:", error);
      throw new Error("Failed to create place");
    }
  },

  // Get all places
  getAllPlaces: async () => {
    try {
      return await Place.findAll({
        include: [
          {
            model: MainPlace,
            as: "mainPlace", // Use the alias defined in the association
            attributes: ["id", "name"],
          },
          {
            model: subPlace,
            as: "subPlace", // Use the alias defined in the association
            attributes: ["id", "name"],
          },
        ],
      });
    } catch (error) {
      console.error("Error in placesService.getAllPlaces:", error);
      throw new Error("Failed to fetch places");
    }
  },

  // Get a place by ID
  getPlaceById: async (id) => {
    try {
      const place = await Place.findByPk(id);
      if (!place) throw new Error("Place not found");
      return place;
    } catch (error) {
      console.error("Error in placesService.getPlaceById:", error);
      throw new Error(error.message || "Failed to fetch place");
    }
  },

  // Update a place by ID
  updatePlace: async (id, data) => {
    try {
      const place = await Place.findByPk(id);
      if (!place) throw new Error("Place not found");
      const { name, selectedMainPlace, selectedSubPlace } = data;

      const updatedPlace = await place.update(name);
      const subplaceInstance = await subPlace.findOne({
        where: { id: selectedSubPlace },
      });
      const mainPlaceInstance = await MainPlace.findOne({
        where: { id: selectedMainPlace },
      });
      await updatedPlace.setMainPlace(mainPlaceInstance);
      await updatedPlace.setSubPlace(subplaceInstance);
      // Reload the updated place including its associated mainPlace and subPlace
      const updatedPlaceRes = await Place.findByPk(id, {
        include: [
          { model: MainPlace, as: "mainPlace", attributes: ["id", "name"] },
          { model: subPlace, as: "subPlace", attributes: ["id", "name"] },
        ],
      });
      return updatedPlaceRes;
    } catch (error) {
      console.error("Error in placesService.updatePlace:", error);
      throw new Error(error.message || "Failed to update place");
    }
  },

  // Delete a place by ID
  deletePlace: async (id) => {
    try {
      const place = await Place.findByPk(id);
      if (!place) throw new Error("Place not found");

      await place.destroy();
      return { message: "Place deleted successfully" };
    } catch (error) {
      console.error("Error in placesService.deletePlace:", error);
      throw new Error(error.message || "Failed to delete place");
    }
  },
};

// services/MainPlaceService.js
// (Assuming you have an index file in /models that exports your models.)

class MainPlaceService {
  async createMainPlace(data) {
    return await MainPlace.create(data);
  }

  async getAllMainPlaces() {
    return await MainPlace.findAll();
  }

  async getMainPlaceById(id) {
    return await MainPlace.findByPk(id);
  }

  async updateMainPlace(id, data) {
    const mainPlace = await MainPlace.findByPk(id);
    if (!mainPlace) {
      throw new Error("MainPlace not found");
    }
    return await mainPlace.update(data);
  }

  async deleteMainPlace(id) {
    const mainPlace = await MainPlace.findByPk(id);
    if (!mainPlace) {
      throw new Error("MainPlace not found");
    }
    await mainPlace.destroy();
    return mainPlace;
  }
}

class SubPlaceService {
  async createsubPlace(data) {
    try {
      const newsubPlace = await subPlace.create(data);
      return newsubPlace;
    } catch (error) {
      console.error("Error in subPlaceService.createsubPlace:", error);
      throw new Error("Failed to create sub place");
    }
  }

  async getAllsubPlaces() {
    try {
      return await subPlace.findAll();
    } catch (error) {
      console.error("Error in subPlaceService.getAllsubPlaces:", error);
      throw new Error("Failed to fetch sub places");
    }
  }

  async getsubPlaceById(id) {
    try {
      const subPlace = await subPlace.findByPk(id);
      if (!subPlace) throw new Error("subPlace not found");
      return subPlace;
    } catch (error) {
      console.error("Error in subPlaceService.getsubPlaceById:", error);
      throw new Error(error.message || "Failed to fetch sub place");
    }
  }

  async updatesubPlace(id, data) {
    try {
      const subPlace = await subPlace.findByPk(id);
      if (!subPlace) throw new Error("subPlace not found");
      return await subPlace.update(data);
    } catch (error) {
      console.error("Error in subPlaceService.updatesubPlace:", error);
      throw new Error(error.message || "Failed to update sub place");
    }
  }

  async deletesubPlace(id) {
    try {
      const subPlace = await subPlace.findByPk(id);
      if (!subPlace) throw new Error("subPlace not found");
      await subPlace.destroy();
      return { message: "subPlace deleted successfully" };
    } catch (error) {
      console.error("Error in subPlaceService.deletesubPlace:", error);
      throw new Error(error.message || "Failed to delete sub place");
    }
  }
}

module.exports = {
  placesService,
  mainPlaceService: new MainPlaceService(),
  subPlaceService: new SubPlaceService(),
};
