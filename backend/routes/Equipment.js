const express = require('express');
const EquipmentTypeController = require('../controllers/Equipment');

const router = express.Router();

// POST route to create an EquipmentType
router.post('/equipment-types', EquipmentTypeController.create);

module.exports = router;
