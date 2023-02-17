

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PublicationStates', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    stateName: {
      type: Sequelize.STRING,
    },

  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('PublicationStates'),
};
