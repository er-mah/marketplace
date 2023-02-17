

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('DROP TRIGGER Publications_vector_update ON "Publications"'),
};
