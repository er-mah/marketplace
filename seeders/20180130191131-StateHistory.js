module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      'HistoryStates',
      [
        {
          publication_id: 836,
          publicationState_id: 1,
          createdAt: '2018-01-16 05:08:24',
          updatedAt: '2018-01-16 05:08:24',
        },
        {
          publication_id: 836,
          publicationState_id: 2,
          createdAt: '2018-01-16 19:08:24',
          updatedAt: '2018-01-16 19:08:24',
        },
        {
          publication_id: 836,
          publicationState_id: 4,
          createdAt: '2018-01-16 20:08:24',
          updatedAt: '2018-01-16 20:08:24',
        },
        {
          publication_id: 836,
          publicationState_id: 2,
          createdAt: '2018-01-16 22:08:24',
          updatedAt: '2018-01-16 22:08:24',
          active: true,
        },
        /* {
          publication_id: 836,
          publicationState_id: 5,
          createdAt: '2018-01-23 20:08:24',
          updatedAt: '2018-01-23 20:08:24',
        }, */
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
