'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Publications', 'province_id', Sequelize.INTEGER)
      .then(()=>queryInterface.addColumn('Publications', 'town_id', Sequelize.INTEGER)),

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Publications', 'province_id')
      .then(()=>queryInterface.removeColumn('Publications', 'town_id'))
    ];
  }
};
