

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CommentThreads', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    chatToken: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    publication_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Publications',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    participant1_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    participant2_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('CommentThreads'),
};
