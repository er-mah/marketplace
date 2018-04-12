

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Rates', [
    {
      period: '2008 - 0km',
      rate: 0.0375,
      term: 12,
    },
    {
      period: '2008 - 0km',
      rate: 0.04,
      term: 18,
    },
    {
      period: '2008 - 0km',
      rate: 0.04,
      term: 24,
    },
    {
      period: '2008 - 0km',
      rate: 0.0425,
      term: 36,
    },
    {
      period: '2003 - 2007',
      rate: 0.04,
      term: 12,
    },
    {
      period: '2003 - 2007',
      rate: 0.0425,
      term: 18,
    },
    {
      period: '2003 - 2007',
      rate: 0.0425,
      term: 24,
    },
    {
      period: '2003 - 2007',
      rate: 0.0455,
      term: 36,
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
