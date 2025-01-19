const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database'); // Replace with your Sequelize instance

const TechnicalWarehouse = sequelize.define('TechnicalWarehouse', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures the field is not empty
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Default quantity is 0
    validate: {
      min: 0, // Prevents negative values
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Defaults to available
  },
}, {
  timestamps: true, // Adds `createdAt` and `updatedAt` fields
  tableName: 'TechnicalWarehouse', // Explicitly set the table name
});

module.exports = TechnicalWarehouse;
