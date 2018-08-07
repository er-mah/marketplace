'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Provinces', [
        {id: 1,  name: 'Buenos Aires'},
        {id: 2,  name: 'Buenos Aires-GBA'},
        {id: 3,  name: 'Capital Federal'},
        {id: 4,  name: 'Catamarca'},
        {id: 5,  name: 'Chaco'},
        {id: 6,  name: 'Chubut'},
        {id: 7,  name: 'Córdoba'},
        {id: 8,  name: 'Corrientes'},
        {id: 9,  name: 'Entre Ríos'},
        {id: 10, name:  'Formosa'},
        {id: 11, name:  'Jujuy'},
        {id: 12, name:  'La Pampa'},
        {id: 13, name:  'La Rioja'},
        {id: 14, name:  'Mendoza'},
        {id: 15, name:  'Misiones'},
        {id: 16, name:  'Neuquén'},
        {id: 17, name:  'Río Negro'},
        {id: 18, name:  'Salta'},
        {id: 19, name:  'San Juan'},
        {id: 20, name:  'San Luis'},
        {id: 21, name:  'Santa Cruz'},
        {id: 22, name:  'Santa Fe'},
        {id: 23, name:  'Santiago del Estero'},
        {id: 24, name:  'Tierra del Fuego'},
        {id: 25, name:  'Tucumán'},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
