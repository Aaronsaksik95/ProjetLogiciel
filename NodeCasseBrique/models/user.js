'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Roles,{
      foreignKey:{
        defaultValue: 1,
        allowNull: false
      }
    });
    User.hasMany(models.Avancement, {
      onDelete: "cascade"
    });
    User.hasMany(models.Audio, {
      onDelete: "cascade"
    });
  };
  return User;
};