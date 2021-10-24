'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: 'unknown',
        allowNull: true
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: 'unknown',
        allowNull: true
      },
      description: {
        type: Sequelize.STRING(1500),
        defaultValue: 'unknown',
        allowNull: true
      },
      price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: 'unknown',
        allowNull: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};