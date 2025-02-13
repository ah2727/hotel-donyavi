// models/RepairType.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");
const RepairTypeType = require("./repairTypeType");

class RepairType extends Model {}

RepairType.init(
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
    repairTypeTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: RepairTypeType, // Links to the RepairTypeType model
        key: "id",
      },
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "RepairType",
    tableName: "RepairType",
    timestamps: true,
  }
);

module.exports = RepairType;
