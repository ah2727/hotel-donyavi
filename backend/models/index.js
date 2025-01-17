const { Sequelize } = require("sequelize");
const sequelize = require("../configs/database");

// Import models
const User = require("./users")(sequelize);
const Permission = require("./permission")(sequelize);
const UserPermission = require("./userPermission")(sequelize);
const EquipmentType = require("./EquipmentType"); // Import EquipmentType for association
const Equipment = require("./Equipment"); // Import Equipment for association
const Person = require('./persons')



const PersonModel = Person(sequelize); // Pass sequelize instance to the model


// Setup associations
User.belongsToMany(Permission, {
  through: UserPermission,
  foreignKey: "userId",
  otherKey: "permissionId",
});

Permission.belongsToMany(User, {
  through: UserPermission,
  foreignKey: "permissionId",
  otherKey: "userId",
});
// Define the association between Equipment and EquipmentType
Equipment.belongsTo(EquipmentType, {
  foreignKey: "equipmentTypeId",
  as: "equipmentType",
});
EquipmentType.hasMany(Equipment, {
  foreignKey: "equipmentTypeId",
  as: "equipments",
});
// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Permission,
  UserPermission,
  Person
};
