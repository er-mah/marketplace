

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('PublicationStates', [
    {
      stateName: 'Pendiente',
    },
    {
      stateName: 'Publicada',
    },
    {
      stateName: 'Suspendida',
    },
    {
      stateName: 'Vendida',
    },
    {
      stateName: 'Archivada',
    },
    {
      stateName: 'Eliminada',
    },
    {
      stateName: 'Vencida',
    },
    {
      stateName: 'Apto para garantía',
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
