

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    agencyName: {
      type: Sequelize.STRING,
    },
    agencyAdress: {
      type: Sequelize.STRING,
    },
    agencyEmail: {
      type: Sequelize.STRING,
    },
    agencyPhone: {
      type: Sequelize.STRING,
    },
    profileImage: {
      type: Sequelize.STRING,
    },
    bannerImage: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
    },
    isAgency:{
      type: Sequelize.BOOLEAN,
    }
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
