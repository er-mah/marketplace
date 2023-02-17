
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Publications', 'ml_id', Sequelize.STRING),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Publications', 'ml_id'),
};
