

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
    image9: {
      type: Sequelize.STRING,
    },
    image10: {
      type: Sequelize.STRING,
    },
    image11: {
      type: Sequelize.STRING,
    },
    image12: {
      type: Sequelize.STRING,
    },
    image13: {
      type: Sequelize.STRING,
    },
    image14: {
      type: Sequelize.STRING,
    },
    image15: {
      type: Sequelize.STRING,
    },
    image16: {
      type: Sequelize.STRING,
    },
    image17: {
      type: Sequelize.STRING,
    },
    image18: {
      type: Sequelize.STRING,
    },
    image19: {
      type: Sequelize.STRING,
    },
    image20: {
      type: Sequelize.STRING,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ImageGroups'),
};
