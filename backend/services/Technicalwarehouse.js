const TechnicalWarehouse = require('../models/Technicalwarehouse');

const technicalWarehouseService = {
  // Create a new item
  async create(data) {
    return await TechnicalWarehouse.create(data);
  },

  // Get all items
  async getAll() {
    return await TechnicalWarehouse.findAll();
  },

  // Get a single item by ID
  async getById(id) {
    return await TechnicalWarehouse.findOne({ where: { id } });
  },

  // Update an item by ID
  async update(id, updates) {
    const item = await TechnicalWarehouse.findOne({ where: { id } });
    if (!item) {
      throw new Error('Item not found');
    }
    return await item.update(updates);
  },

  // Delete an item by ID
  async delete(id) {
    const deleted = await TechnicalWarehouse.destroy({ where: { id } });
    if (deleted === 0) {
      throw new Error('Item not found');
    }
    return true;
  },
};

module.exports = technicalWarehouseService;
