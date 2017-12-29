
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('ImageGroups', [{
    image1: 'i1.jpg',
    image2: 'i2.jpg',
    image3: 'i3.png',
    image4: 'i4.jpg',
    image5: 'i5.jpg',
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
