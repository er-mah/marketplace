
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('HistoryStates', [
    {
      publication_id: 1,
      publicationState_id: 2,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 2,
      publicationState_id: 5,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 3,
      publicationState_id: 2,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 4,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 5,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 6,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 7,
      publicationState_id: 2,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 8,
      publicationState_id: 2,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 9,
      publicationState_id: 2,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 10,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 11,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 12,
      publicationState_id: 2,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 13,
      publicationState_id: 3,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 14,
      publicationState_id: 3,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 15,
      publicationState_id: 5,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 16,
      publicationState_id: 5,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 17,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 18,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 19,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      publication_id: 20,
      publicationState_id: 1,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
  ], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
