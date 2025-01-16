const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./user')(sequelize);
const Permission = require('./permission')(sequelize);
const UserPermission = require('./userPermission')(sequelize);

// Setup associations
User.belongsToMany(Permission, {
  through: UserPermission,
  foreignKey: 'userId',
  otherKey: 'permissionId',
});

Permission.belongsToMany(User, {
  through: UserPermission,
  foreignKey: 'permissionId',
  otherKey: 'userId',
});

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Permission,
  UserPermission,
};
