module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Publications', 'publicationDetail_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Publications', 'publicationDetail_id', {
    type: Sequelize.INTEGER,
    allowNull: false,
  }),
};
