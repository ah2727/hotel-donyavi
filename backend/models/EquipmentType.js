const { DataTypes, Model } = require('sequelize');
const sequelize = require("../configs/database");

class EquipmentType extends Model {}

EquipmentType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'EquipmentType',
    tableName: 'EquipmentTypes',
    timestamps: true, // Adds `createdAt` and `updatedAt` columns
  }
);

module.exports = EquipmentType;
