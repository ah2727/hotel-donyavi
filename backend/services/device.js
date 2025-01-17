const Device = require('../models/device');

class DeviceService {
  // Create a new Device
  static async createDevice(data) {
    try {
      const device = await Device.create(data);
      return device;
    } catch (error) {
      throw new Error('Error creating Device: ' + error.message);
    }
  }

  // Retrieve all Devices
  static async getAllDevices() {
    try {
      const devices = await Device.findAll();
      return devices;
    } catch (error) {
      throw new Error('Error retrieving Devices: ' + error.message);
    }
  }

  // Retrieve a Device by ID
  static async getDeviceById(id) {
    try {
      const device = await Device.findByPk(id);
      if (!device) {
        throw new Error('Device not found');
      }
      return device;
    } catch (error) {
      throw new Error('Error retrieving Device: ' + error.message);
    }
  }

  // Update a Device by ID
  static async updateDevice(id, data) {
    try {
      const device = await Device.findByPk(id);
      if (!device) {
        throw new Error('Device not found');
      }
      await device.update(data);
      return device;
    } catch (error) {
      throw new Error('Error updating Device: ' + error.message);
    }
  }

  // Delete a Device by ID
  static async deleteDevice(id) {
    try {
      const device = await Device.findByPk(id);
      if (!device) {
        throw new Error('Device not found');
      }
      await device.destroy();
      return { message: 'Device deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting Device: ' + error.message);
    }
  }
}

module.exports = DeviceService;
