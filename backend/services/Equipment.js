const EquipmentType = require('../models/EquipmentType');

class EquipmentTypeService {
  // Create a new EquipmentType
  static async createEquipmentType(data) {
    try {
      const equipmentType = await EquipmentType.create(data);
      return equipmentType;
    } catch (error) {
      throw new Error('Error creating EquipmentType: ' + error.message);
    }
  }
}

module.exports = EquipmentTypeService;
