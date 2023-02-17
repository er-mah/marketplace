
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Publications', 'ml_detail', Sequelize.STRING),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Publications', 'ml_detail'),
};
