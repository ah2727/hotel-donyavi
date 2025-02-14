// controllers/repairTypeTypeController.js
const repairTypeTypeService = require("../services/repairTypeType");

class RepairTypeTypeController {
  async createRepairTypeType(req, res) {
    try {
      const repairTypeType = await repairTypeTypeService.createRepairTypeType(req.body);
      return res.status(201).json(repairTypeType);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllRepairTypeTypes(req, res) {
    try {
      const repairTypeTypes = await repairTypeTypeService.findAllRepairTypeTypes();
      return res.status(200).json({data:repairTypeTypes});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async getRepairTypeTypeById(req, res) {
    try {
      const { id } = req.params;
      const repairTypeType = await repairTypeTypeService.findRepairTypeTypeById(id);
      if (!repairTypeType) {
        return res.status(404).json({ message: "RepairTypeType not found" });
      }
      return res.status(200).json(repairTypeType);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async updateRepairTypeType(req, res) {
    try {
      const { id } = req.params;
      const repairTypeType = await repairTypeTypeService.updateRepairTypeType(id, req.body);
      return res.status(200).json(repairTypeType);
    } catch (error) {
      console.error(error);
      if (error.message === "RepairTypeType not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteRepairTypeType(req, res) {
    try {
      const { id } = req.params;
      await repairTypeTypeService.deleteRepairTypeType(id);
      return res.status(200).json({ message: "RepairTypeType deleted successfully" });
    } catch (error) {
      console.error(error);
      if (error.message === "RepairTypeType not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RepairTypeTypeController();
