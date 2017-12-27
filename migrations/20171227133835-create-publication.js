

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Publications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    brand: {
      type: Sequelize.STRING,
    },
    group: {
      type: Sequelize.STRING,
    },
    modelName: {
      type: Sequelize.STRING,
    },
    kms: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    fuel: {
      type: Sequelize.STRING,
    },
    observation: {
      type: Sequelize.TEXT,
    },
    carState: {
      allowNull: false,
      type: Sequelize.ENUM('Nuevo', 'Usado'),
    },
    codia: {
      type: Sequelize.INTEGER,
    },
    imageGroup_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'ImageGroups',
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
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },

  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Publications'),
};
