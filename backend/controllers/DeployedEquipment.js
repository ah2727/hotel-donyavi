const DeployedEquipmentService = require('../services/DeployedEquipment');

const DeployedEquipmentController = {
  async create(req, res) {
    try {
      const data = req.body;
      const deployedEquipment = await DeployedEquipmentService.createDeployedEquipment(data);
      res.status(201).json(deployedEquipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const deployedEquipment = await DeployedEquipmentService.getDeployedEquipmentById(id);
      if (!deployedEquipment) return res.status(404).json({ error: 'DeployedEquipment not found' });
      res.status(200).json(deployedEquipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const deployedEquipmentList = await DeployedEquipmentService.getAllDeployedEquipment();
      res.status(200).json(deployedEquipmentList);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const updates = req.body;
      const updatedDeployedEquipment = await DeployedEquipmentService.updateDeployedEquipment(id, updates);
      res.status(200).json(updatedDeployedEquipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      await DeployedEquipmentService.deleteDeployedEquipment(id);
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = DeployedEquipmentController;
