// services/repairTypeTypeService.js
const RepairTypeType = require("../models/repairTypeType");

class RepairTypeTypeService {
  async createRepairTypeType(data) {
    const repairTypeType = await RepairTypeType.create(data);
    return repairTypeType;
  }

  async findAllRepairTypeTypes() {
    const repairTypeTypes = await RepairTypeType.findAll();
    return repairTypeTypes;
  }

  async findRepairTypeTypeById(id) {
    const repairTypeType = await RepairTypeType.findByPk(id);
    return repairTypeType;
  }

  async updateRepairTypeType(id, data) {
    const repairTypeType = await RepairTypeType.findByPk(id);
    if (!repairTypeType) {
      throw new Error("RepairTypeType not found");
    }
    await repairTypeType.update(data);
    return repairTypeType;
  }

  async deleteRepairTypeType(id) {
    const repairTypeType = await RepairTypeType.findByPk(id);
    if (!repairTypeType) {
      throw new Error("RepairTypeType not found");
    }
    await repairTypeType.destroy();
    return repairTypeType;
  }
}

module.exports = new RepairTypeTypeService();
