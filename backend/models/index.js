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
const RepairType = require("./repairType");
const RepairTypeType = require("./repairTypeType");

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

// Association: EquipmentType belongs to DeviceType
EquipmentType.belongsTo(Device, {
  foreignKey: "deviceTypeId",
  as: "deviceType",
});

// Association: DeviceType has many EquipmentType
Device.hasMany(EquipmentType, {
  foreignKey: "deviceTypeId",
  as: "equipmentTypes",
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


// Each Place has one MainPlace.
Place.hasOne(MainPlace, {
  foreignKey: 'placeId',   // This column must exist in the MainPlace table.
  as: 'mainPlace'          // Alias for easier eager loading and querying.
});

// The inverse: each MainPlace belongs to a Place.
MainPlace.belongsTo(Place, {
  foreignKey: 'placeId',
  as: 'place'
});

// Each Place has one SubPlace.
Place.hasOne(subPlace, {
  foreignKey: 'placeId',   // This column must exist in the SubPlace table.
  as: 'subPlace'           // Alias for eager loading and querying.
});

// The inverse: each SubPlace belongs to a Place.
subPlace.belongsTo(Place, {
  foreignKey: 'placeId',
  as: 'place'
});
RepairType.belongsTo(RepairTypeType, { 
  foreignKey: "repairTypeTypeId", 
  as: "repairTypeType" 
});

// Each RepairTypeType can have many RepairTypes
RepairTypeType.hasMany(RepairType, { 
  foreignKey: "repairTypeTypeId", 
  as: "repairTypes" 
});

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
