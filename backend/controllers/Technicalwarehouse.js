const technicalWarehouseService = require('../services/Technicalwarehouse');

const technicalWarehouseController = {
  // Create a new item
  async create(req, res) {
    try {
      const data = req.body;
      const newItem = await technicalWarehouseService.create(data);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all items
  async getAll(req, res) {
    try {
      const items = await technicalWarehouseService.getAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single item by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await technicalWarehouseService.getById(id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update an item by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedItem = await technicalWarehouseService.update(id, updates);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Delete an item by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      await technicalWarehouseService.delete(id);
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = technicalWarehouseController;
