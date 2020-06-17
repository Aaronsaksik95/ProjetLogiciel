'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Niveaus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      colorMain: {
        type: Sequelize.STRING
      },
      color1: {
        type: Sequelize.STRING
      },
      color2: {
        type: Sequelize.STRING
      },
      color3: {
        type: Sequelize.STRING
      },
      vitesse: {
        type: Sequelize.INTEGER
      },
      paddle: {
        type: Sequelize.INTEGER
      },
      rowBlock: {
        type: Sequelize.INTEGER
      },
      columnBlock: {
        type: Sequelize.INTEGER
      },
      balle: {
        type: Sequelize.INTEGER
      },
      strongBlock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Niveaus');
  }
};