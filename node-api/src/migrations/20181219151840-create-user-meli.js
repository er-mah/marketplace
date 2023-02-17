'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_melis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      ml_user_id: {
        type: Sequelize.INTEGER
      },
      user_token: {
        type: Sequelize.STRING
      },
      user_refresh_token: {
        type: Sequelize.STRING
      },
      user_code: {
        type: Sequelize.STRING
      },
      expires_in: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('user_meli');
  }
};