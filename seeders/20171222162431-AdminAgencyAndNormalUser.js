const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      email: 'amin@yopmail.com',
      password: bcrypt.hashSync('123123', bcrypt.genSaltSync(8), null),
      name: 'Admin',
      profileImage: 'ejemplo.jpg',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
      isAdmin: true,
    },
    {
      email: 'usuario@yopmail.com',
      password: bcrypt.hashSync('123123', bcrypt.genSaltSync(8), null),
      name: 'Usuario',
      address: 'Los tilos 123',
      phone: '31212-235',
      profileImage: 'ejemplo.jpg',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
      isAdmin: false,
    },
    {
      email: 'encargado@yopmail.com',
      password: bcrypt.hashSync('123123', bcrypt.genSaltSync(8), null),
      name: 'Agencia',
      address: 'Los tilos 123',
      phone: '31212-235',
      agencyName: 'Agencia',
      agencyAdress: 'San martin 1115',
      agencyEmail: 'agencia@yopmail.com',
      agencyPhone: '23124123',
      profileImage: 'agencia.jpg',
      bannerImage: 'banner.jpg',
      isAdmin: false,
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
