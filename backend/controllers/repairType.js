// controllers/RepairTypeController.js
const repairTypeService = require("../services/repairType");

class RepairTypeController {
  async createRepairType(req, res) {
    try {
      const newRepairType = await repairTypeService.createRepairType(req.body);
      return res.status(201).json({data:newRepairType});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async getRepairTypes(req, res) {
    try {
      const repairTypes = await repairTypeService.getRepairTypes();
      return res.status(200).json(repairTypes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async getRepairTypeById(req, res) {
    try {
      const repairType = await repairTypeService.getRepairTypeById(req.params.id);
      if (!repairType) {
        return res.status(404).json({ message: "RepairType not found" });
      }
      return res.status(200).json(repairType);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async updateRepairType(req, res) {
    try {
      const updatedRepairType = await repairTypeService.updateRepairType(req.params.id, req.body);
      return res.status(200).json(updatedRepairType);
    } catch (error) {
      console.error(error);
      if (error.message === "RepairType not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteRepairType(req, res) {
    try {
      await repairTypeService.deleteRepairType(req.params.id);
      return res.status(200).json({ message: "RepairType deleted successfully" });
    } catch (error) {
      console.error(error);
      if (error.message === "RepairType not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RepairTypeController();
