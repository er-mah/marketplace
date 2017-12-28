const moment = require('moment');


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Publications', [{
    brand: 'Citroen',
    group: 'C3 Aircross',
    modelName: 'C3 1.4I SX L/08',
    kms: '13.000',
    price: 120000,
    year: 2011,
    fuel: 'Nafta',
    observation: 'Ta como nuevo',
    carState: 'Usado',
    imageGroup_id: 1,
    createdAt: moment().format('YYYY-MM-DD'),
    updatedAt: moment().format('YYYY-MM-DD'),
    deletedAt: null,
    user_id: 1,
  }], {}),
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
