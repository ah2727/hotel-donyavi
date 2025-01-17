const EquipmentTypeService = require('../services/Equipment');

class EquipmentTypeController {
  // Controller method to handle the creation of EquipmentType
  static async create(req, res) {
    try {
      const { name, description } = req.body;

      // Validate request payload
      if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
      }

      // Call the service to create a new EquipmentType
      const equipmentType = await EquipmentTypeService.createEquipmentType({
        name,
        description,
      });

      // Send success response
      return res.status(201).json({
        message: 'EquipmentType created successfully!',
        data: equipmentType,
      });
    } catch (error) {
      // Handle errors
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = EquipmentTypeController;
