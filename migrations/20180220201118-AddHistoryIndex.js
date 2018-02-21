

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addIndex(
    'HistoryStates',
    {
      fields: ['publicationState_id'],
    },
  )
    .then(() => queryInterface.addIndex(
      'HistoryStates',
      {
        fields: ['publication_id'],
      },
    )),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
