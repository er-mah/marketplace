

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('HistoryStates', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    publication_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Publications',
        key: 'id',
      },
    },
    publicationState_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'PublicationStates',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('HistoryStates'),
};
