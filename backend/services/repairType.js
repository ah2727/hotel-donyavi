// services/RepairTypeService.js
const RepairType = require("../models/repairType");

class RepairTypeService {
  async createRepairType(data) {
    const { name, repairTypeTypeId, description } = data;

    const repairType = await RepairType.create({
        name,
        repairTypeTypeId: parseInt(repairTypeTypeId, 10), // Convert to integer
        description,
      });
      return repairType;
  }

  async getRepairTypes() {
    const repairTypes = await RepairType.findAll();
    return repairTypes;
  }

  async getRepairTypeById(id) {
    const repairType = await RepairType.findByPk(id);
    return repairType;
  }

  async updateRepairType(id, data) {
    const repairType = await RepairType.findByPk(id);
    if (!repairType) {
      throw new Error("RepairType not found");
    }
    await repairType.update(data);
    return repairType;
  }

  async deleteRepairType(id) {
    const repairType = await RepairType.findByPk(id);
    if (!repairType) {
      throw new Error("RepairType not found");
    }
    await repairType.destroy();
    return true;
  }
}

module.exports = new RepairTypeService();
