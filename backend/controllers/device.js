const DeviceService = require('../services/device');

class DeviceController {
  // Create a new Device
  static async create(req, res) {
    try {
      const { name, brand, model, serialNumber, purchaseDate, status } = req.body;

      // Validate required fields
      if (!name || !brand || !model || !serialNumber) {
        return res.status(400).json({ message: 'Name, brand, model, and serial number are required.' });
      }

      const device = await DeviceService.createDevice({
        name,
        brand,
        model,
        serialNumber,
        purchaseDate,
        status,
      });

      return res.status(201).json({
        message: 'Device created successfully',
        data: device,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve all Devices
  static async getAll(req, res) {
    try {
      const devices = await DeviceService.getAllDevices();
      return res.status(200).json({ data: devices });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve a Device by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const device = await DeviceService.getDeviceById(id);
      return res.status(200).json({ data: device });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Update a Device by ID
  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedDevice = await DeviceService.updateDevice(id, data);
      return res.status(200).json({
        message: 'Device updated successfully',
        data: updatedDevice,
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Delete a Device by ID
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const message = await DeviceService.deleteDevice(id);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

module.exports = DeviceController;
