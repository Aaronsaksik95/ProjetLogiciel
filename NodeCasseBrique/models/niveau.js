'use strict';
module.exports = (sequelize, DataTypes) => {
  const Niveau = sequelize.define('Niveau', {
    colorMain: DataTypes.STRING,
    color1: DataTypes.STRING,
    color2:DataTypes.STRING,
    color3: DataTypes.STRING,
    vitesse: DataTypes.INTEGER,
    paddle: DataTypes.INTEGER,
    rowBlock: DataTypes.INTEGER,
    columnBlock: DataTypes.INTEGER,
    balle: DataTypes.INTEGER,
    strongBlock: DataTypes.INTEGER
  }, {});
  Niveau.associate = function (models) {
    Niveau.hasMany(models.Avancement, {
      onDelete: "cascade"
    });
  };
  return Niveau;
};