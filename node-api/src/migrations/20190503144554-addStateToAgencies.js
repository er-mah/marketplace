
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'state', {
    type: Sequelize.ENUM('Pendiente', 'Aprobado', 'Rechazado'),
    defaultValue: 'Pendiente',
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'state'),
};
