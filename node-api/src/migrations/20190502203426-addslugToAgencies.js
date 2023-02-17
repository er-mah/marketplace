
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'slug', {
    type: Sequelize.STRING,
    unique: true,
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'slug'),
};
