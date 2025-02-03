const { Sequelize } = require("sequelize");
const sequelize = require("../configs/database");
const Device = require("./Device"); 
// Import models
const User = require("./users")(sequelize);
const Permission = require("./permission")(sequelize);
const UserPermission = require("./userPermission")(sequelize);
const EquipmentType = require("./EquipmentType"); // Import EquipmentType for association
const Equipment = require("./Equipment"); // Import Equipment for association
const initMainPlace = require("./mainPlace")
const initSubplaces = require("./subPlace")
const PersonModel = require('./persons')
const initPlace = require('./places')
const DeployedEquipmentModel = require('./DeployedEquipment');


const Person = PersonModel(sequelize); // Pass sequelize instance to the model
const Place = initPlace(sequelize);
const DeployedEquipment = DeployedEquipmentModel(sequelize);
const MainPlace = initMainPlace(sequelize)
const subPlace = initSubplaces(sequelize)
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

// Define the association between Equipment and Device
// Relationships
Equipment.hasMany(Device, {
  foreignKey: "equipmentId", // Foreign key in Device
  as: "devices", // Alias for accessing related Devices
});
Device.belongsTo(Equipment, {
  foreignKey: "equipmentId", // Foreign key in Device
  as: "equipment", // Alias for accessing the related Equipment
});


// In Place model:
Place.hasMany(Equipment, {
  foreignKey: 'placeId', // This column will be added to the Equipment table
  as: 'equipments'       // You can use this alias to reference the associated equipment
});

// In Equipment model:
Equipment.belongsTo(Place, {
  foreignKey: 'placeId',
  as: 'place'           // This alias allows you to easily access the related Place
});
// Define relationships
DeployedEquipment.belongsTo(Equipment, { foreignKey: 'equipmentId', as: 'equipment' });
Equipment.hasOne(DeployedEquipment, { foreignKey: 'equipmentId', as: 'deployedEquipment' });

DeployedEquipment.belongsTo(Place, { foreignKey: 'placeId', as: 'place' });
Place.hasOne(DeployedEquipment, { foreignKey: 'placeId', as: 'deployedEquipment' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Permission,
  UserPermission,
  Person,
  Device,
  Place,
  Equipment,
  DeployedEquipment,
  MainPlace,
  subPlace
};
