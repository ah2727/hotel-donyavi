const EquipmentTypeService = require('../services/Equipment');
const EquipmentService = require('../services/Equipment');


class EquipmentController {
  // Create a new Equipment
  static async create(req, res) {
    try {
      const { name, serialNumber, purchaseDate, equipmentTypeId } = req.body;

      // Validate required fields
      if (!name || !serialNumber) {
        return res.status(400).json({ message: 'Name and Serial Number are required.' });
      }

      const equipment = await EquipmentService.createEquipment({
        name,
        serialNumber,
        purchaseDate,
        equipmentTypeId,
      });

      return res.status(201).json({
        message: 'Equipment created successfully',
        data: equipment,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve all Equipment
  static async getAll(req, res) {
    try {
      const equipmentList = await EquipmentService.getAllEquipment();
      return res.status(200).json({ data: equipmentList });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve an Equipment by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const equipment = await EquipmentService.getEquipmentById(id);
      return res.status(200).json({ data: equipment });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Update an Equipment by ID
  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedEquipment = await EquipmentService.updateEquipment(id, data);
      return res.status(200).json({
        message: 'Equipment updated successfully',
        data: updatedEquipment,
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Delete an Equipment by ID
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const message = await EquipmentService.deleteEquipment(id);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

class EquipmentTypeController {
  // Create a new EquipmentType
  static async create(req, res) {
    try {
      const { name, description } = req.body;

      // Validate required fields
      if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
      }

      const equipmentType = await EquipmentTypeService.createEquipmentType({
        name,
        description,
      });

      return res.status(201).json({
        message: 'EquipmentType created successfully',
        data: equipmentType,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve all EquipmentTypes
  static async getAll(req, res) {
    try {
      const equipmentTypes = await EquipmentTypeService.getAllEquipmentTypes();
      return res.status(200).json({ data: equipmentTypes });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve an EquipmentType by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const equipmentType = await EquipmentTypeService.getEquipmentTypeById(id);
      return res.status(200).json({ data: equipmentType });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Update an EquipmentType by ID
  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedEquipmentType = await EquipmentTypeService.updateEquipmentType(id, data);
      return res.status(200).json({
        message: 'EquipmentType updated successfully',
        data: updatedEquipmentType,
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Delete an EquipmentType by ID
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const message = await EquipmentTypeService.deleteEquipmentType(id);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

module.exports = EquipmentTypeController,EquipmentController;

