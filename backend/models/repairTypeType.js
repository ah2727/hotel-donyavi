// models/RepairTypeType.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");

class RepairTypeType extends Model {}

RepairTypeType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "RepairTypeType",
    tableName: "RepairTypeType",
    timestamps: true,
  }
);

module.exports = RepairTypeType;
