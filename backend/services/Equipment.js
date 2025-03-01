const EquipmentType = require("../models/EquipmentType");
const Equipment = require("../models/Equipment");
const Device = require("../models/Device");

class EquipmentService {
  static async getEquipmentWithAssociations() {
    try {
      const equipments = await Equipment.findAll({
        include: [
          {
            model: EquipmentType,
            as: "equipmentType",
            include: [
              {
                model: Device,
                as: "deviceType",
              },
            ],
          },
        ],
      });
      return equipments;
    } catch (error) {
      console.error("Error fetching equipments with associations:", error);
      throw error;
    }
  }
  // Create a new Equipment
  static async createEquipment(data) {
    const { selectedDevices, ...equipmentData } = data; // Extract devices and other data
    try {
      // 1. Create the Equipment record
      const equipment = await Equipment.create(equipmentData);

      // 2. If `selectedDevices` is provided, associate devices
      if (selectedDevices && Array.isArray(selectedDevices)) {
        const devices = await Device.findOne({
          where: {
            id: selectedDevices, // Intended to match multiple device IDs?
          },
        });

        // Add the devices to the Equipment using Sequelize association
        await devices.addEquipment(equipment);
      }

      // 3. Return the created Equipment with its associated devices
      const createdEquipment = await Equipment.findOne({
        where: { id: equipment.id },
        include: [
          {
            model: Device,
            as: "devices", // Alias defined in the Sequelize association
          },
        ],
      });

      return createdEquipment; // Return the fully populated equipment
    } catch (error) {
      console.error("Error creating equipment:", error);
      throw new Error("Error creating Equipment: " + error.message);
    }
  }

  // Retrieve all Equipment records
  static async getAllEquipment() {
    try {
      const equipmentList = await Equipment.findAll({
        include: [
          {
            model: EquipmentType,
            as: "equipmentType", // Alias must match the one defined in the association
          },
          {
            model: Device,
            as: "devices", // Alias for associated devices
          },
        ],
      });
      return equipmentList;
    } catch (error) {
      throw new Error("Error retrieving Equipment: " + error.message);
    }
  }

  // Retrieve an Equipment record by ID
  static async getEquipmentById(id) {
    try {
      const equipment = await Equipment.findByPk(id, {
        include: ["EquipmentType"], // Include related EquipmentType
      });
      if (!equipment) {
        throw new Error("Equipment not found");
      }
      return equipment;
    } catch (error) {
      throw new Error("Error retrieving Equipment: " + error.message);
    }
  }

  // Update an Equipment record by ID
  static async updateEquipment(id, data) {
    try {
      const equipment = await Equipment.findByPk(id);
      if (!equipment) {
        throw new Error("Equipment not found");
      }
      await equipment.update(data);
      return equipment;
    } catch (error) {
      throw new Error("Error updating Equipment: " + error.message);
    }
  }

  // Delete an Equipment record by ID
  static async deleteEquipment(id) {
    try {
      const equipment = await Equipment.findByPk(id);
      if (!equipment) {
        throw new Error("Equipment not found");
      }
      await equipment.destroy();
      return { message: "Equipment deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting Equipment: " + error.message);
    }
  }
}
class EquipmentTypeService {
  // Create a new EquipmentType
  static async createEquipmentType(data) {
    try {
      const equipmentType = await EquipmentType.create(data);
      return equipmentType;
    } catch (error) {
      throw new Error("Error creating EquipmentType: " + error.message);
    }
  }

  // Retrieve all EquipmentTypes
  static async getAllEquipmentTypes() {
    try {
      const equipmentTypes = await EquipmentType.findAll();
      return equipmentTypes;
    } catch (error) {
      throw new Error("Error retrieving EquipmentTypes: " + error.message);
    }
  }

  // Retrieve an EquipmentType by ID
  static async getEquipmentTypeById(id) {
    try {
      const equipmentType = await EquipmentType.findByPk(id);
      if (!equipmentType) {
        throw new Error("EquipmentType not found");
      }
      return equipmentType;
    } catch (error) {
      throw new Error("Error retrieving EquipmentType: " + error.message);
    }
  }

  // Update an EquipmentType by ID
  static async updateEquipmentType(id, data) {
    try {
      const equipmentType = await EquipmentType.findByPk(id);
      if (!equipmentType) {
        throw new Error("EquipmentType not found");
      }
      await equipmentType.update(data);
      return equipmentType;
    } catch (error) {
      throw new Error("Error updating EquipmentType: " + error.message);
    }
  }

  // Delete an EquipmentType by ID
  static async deleteEquipmentType(id) {
    try {
      const equipmentType = await EquipmentType.findByPk(id);
      if (!equipmentType) {
        throw new Error("EquipmentType not found");
      }
      await equipmentType.destroy();
      return { message: "EquipmentType deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting EquipmentType: " + error.message);
    }
  }
}

module.exports = { EquipmentTypeService, EquipmentService };
