const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configs/database'); // Import your Sequelize instance

class Device extends Model {}

Device.init(
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
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'retired'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Device',
    tableName: 'Devices',
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = Device;
