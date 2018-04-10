

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PageTexts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    route: { type: Sequelize.STRING },
    section: { type: Sequelize.STRING },
    text: { type: Sequelize.TEXT },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('PageTexts'),
};
