// models/person.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Person = sequelize.define('Person', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensure it's not empty
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensure it's not empty
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true, // Ensure it's a valid email
      },
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'Person', // Table name in the DB
    timestamps: true, // Enables createdAt and updatedAt
  });

  return Person;
};
