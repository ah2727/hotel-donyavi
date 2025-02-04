const { DataTypes, Model } = require("sequelize");
const sequelize  = require("../configs/database");
const { EquipmentType } = require("./EquipmentType");
class Equipment extends Model {}

Equipment.init(
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
    equipmentTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: EquipmentType, // Links to the EquipmentType model
        key: "id",
      },
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Equipment",
    tableName: "Equipment",
    timestamps: true,
  }
);

module.exports = Equipment;
