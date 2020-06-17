'use strict';
module.exports = (sequelize, DataTypes) => {
  const Avancement = sequelize.define('Avancement', {
    score: DataTypes.INTEGER
  });
  Avancement.associate = function(models) {
    Avancement.belongsTo(models.Niveau,{
      foreignKey:{
        allowNull: false
      }
    });
    Avancement.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Avancement;
};