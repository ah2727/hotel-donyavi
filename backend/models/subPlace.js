// models/place.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SubPlace extends Model {}

  SubPlace.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize, // Pass the Sequelize instance.
      modelName: 'SubPlace', // Name of the model.
      tableName: 'subplaces', // Table name in DB.
      timestamps: true, // Enables createdAt and updatedAt.
      underscored: true, // snake_case for column names.
    }
  );

  return SubPlace;
};
