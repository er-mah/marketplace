const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'PublicationDetails',
      [
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
        {
          Bluetooth: false,
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
