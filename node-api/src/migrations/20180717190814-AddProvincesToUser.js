'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'province_id', Sequelize.INTEGER)
      .then(()=>queryInterface.addColumn('Users', 'town_id', Sequelize.INTEGER)),

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'province_id')
      .then(()=>queryInterface.removeColumn('Users', 'town_id'))
    ];
  }
};
