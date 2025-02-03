// models/place.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Place extends Model {}

  Place.init(
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

    },
    {
      sequelize, // Pass the Sequelize instance.
      modelName: 'Place', // Name of the model.
      tableName: 'places', // Table name in DB.
      timestamps: true, // Enables createdAt and updatedAt.
      underscored: true, // snake_case for column names.
    }
  );

  return Place;
};
