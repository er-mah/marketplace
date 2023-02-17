

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('HistoryStates', 'active', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  }),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
