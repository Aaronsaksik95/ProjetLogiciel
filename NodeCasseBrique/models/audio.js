'use strict';
module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define('Audio', {
    son: DataTypes.INTEGER,
    music: DataTypes.INTEGER
  }, {});
  Audio.associate = function (models) {
    Audio.belongsTo(models.User, {
      foreignKey: {
        defaultValue: 1,
        allowNull: false
      }
    });
  };
  return Audio;
};