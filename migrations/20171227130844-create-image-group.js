

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ImageGroups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    image1: {
      type: Sequelize.STRING,
    },
    image2: {
      type: Sequelize.STRING,
    },
    image3: {
      type: Sequelize.STRING,
    },
    image4: {
      type: Sequelize.STRING,
    },
    image5: {
      type: Sequelize.STRING,
    },
    image6: {
      type: Sequelize.STRING,
    },
    image7: {
      type: Sequelize.STRING,
    },
    image8: {
      type: Sequelize.STRING,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ImageGroups'),
};
