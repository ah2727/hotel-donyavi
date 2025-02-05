
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MainPlace extends Model {}

  MainPlace.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },  
    },
    {
      sequelize, // Pass the Sequelize instance.
      modelName: 'MainPlace', // Name of the model.
      tableName: 'mainplaces', // Table name in DB.
      timestamps: true, // Enables createdAt and updatedAt.
      underscored: true, // snake_case for column names.
    }
  );

  return MainPlace;
};
