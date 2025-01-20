const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DeployedEquipment = sequelize.define('DeployedEquipment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING, // Example: "active", "inactive", etc.
      allowNull: false,
    },
    deploymentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return DeployedEquipment;
};
