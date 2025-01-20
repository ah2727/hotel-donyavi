const { DeployedEquipment, Equipment, Place } = require('../models');

const DeployedEquipmentService = {
  async createDeployedEquipment(data) {
    return await DeployedEquipment.create(data);
  },

  async getDeployedEquipmentById(id) {
    return await DeployedEquipment.findOne({
      where: { id },
      include: [
        { model: Equipment, as: 'equipment' },
        { model: Place, as: 'place' },
      ],
    });
  },

  async getAllDeployedEquipment() {
    return await DeployedEquipment.findAll({
      include: [
        { model: Equipment, as: 'equipment' },
        { model: Place, as: 'place' },
      ],
    });
  },

  async updateDeployedEquipment(id, updates) {
    const deployedEquipment = await DeployedEquipment.findByPk(id);
    if (!deployedEquipment) throw new Error('DeployedEquipment not found');
    return await deployedEquipment.update(updates);
  },

  async deleteDeployedEquipment(id) {
    const deployedEquipment = await DeployedEquipment.findByPk(id);
    if (!deployedEquipment) throw new Error('DeployedEquipment not found');
    return await deployedEquipment.destroy();
  },
};

module.exports = DeployedEquipmentService;
