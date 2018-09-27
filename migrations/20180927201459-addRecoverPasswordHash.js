

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'password_hash', Sequelize.STRING),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'password_hash'),
};
