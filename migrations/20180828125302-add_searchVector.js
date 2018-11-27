
const vectorName = 'words';

const searchObjects = {
  Publications: ['brand', 'group', 'modelName', 'kms', 'price', 'year', 'name', 'email', 'observation'],
};

module.exports = {
  up: queryInterface => (
    queryInterface.sequelize.transaction(t =>
      Promise.all(Object.keys(searchObjects).map(table => queryInterface.sequelize.query(`
        ALTER TABLE "Publications" ADD COLUMN ${vectorName} TEXT;
        `, { transaction: t })
        .then(() =>
          queryInterface.sequelize.query(`
              UPDATE "Publications" d1 SET ${vectorName} =  (coalesce(d1."brand", '') || '  ' || coalesce(d1."group", '') || '  ' || coalesce(d1."modelName", '') || '  ' || coalesce(d1."kms", '') || '  ' || coalesce(d1."price", 0) || '  ' || coalesce(d1."year", 0) || '  ' || coalesce(d1."name", '') || '  ' || coalesce(d1."email", '') || '  ' || coalesce(d1."observation", ''));
            `, { transaction: t }))
        .then(() =>
          queryInterface.sequelize.query(`
          CREATE FUNCTION updateWords() RETURNS trigger
            LANGUAGE PLPGSQL
            AS $$
            BEGIN
            UPDATE
            "Publications" d1
        SET
            words = (coalesce(d1. "brand", '') || '  ' || coalesce(d1. "group", '') || '  ' || coalesce(d1. "modelName", '') || '  ' || coalesce(d1. "kms", '') || '  ' || coalesce(d1. "price", 0) || '  ' || coalesce(d1. "year", 0) || '  ' || coalesce(d1. "name", '') || '  ' || coalesce(d1. "email", '') || '  ' || coalesce(d1. "observation", ''));
            RETURN NULL;
            END;
            $$;
            `, { transaction: t }))
        .then(() =>
          queryInterface.sequelize.query(`
              CREATE TRIGGER Publications_vector_update
              AFTER INSERT OR UPDATE ON "Publications"
              FOR EACH ROW EXECUTE PROCEDURE updateWords();
            `, { transaction: t }))
        // .then(() =>
        //   queryInterface.sequelize.query(`
        //   CREATE EXTENSION pg_trgm
        //     `, { transaction: t }))
        // .then(() =>
        //   queryInterface.sequelize.query(`
        //   CREATE EXTENSION btree_gin
        //     `, { transaction: t }))
        .then(() =>
          queryInterface.sequelize.query(`
          CREATE INDEX index_issues_on_words_trigram ON "Publications" USING gin (words);
            `, { transaction: t }))
        .error(console.log))))
  ),

  down: queryInterface => (
    queryInterface.sequelize.transaction(t =>
      Promise.all(Object.keys(searchObjects).map(() => queryInterface.sequelize.query(`
          DROP TRIGGER Publications_vector_update ON Publications;
        `, { transaction: t })
        .then(() =>
          queryInterface.sequelize.query(`
                DROP INDEX index_issues_on_words_trigram;
              `, { transaction: t })).then(() =>
          queryInterface.sequelize.query(`
                ALTER TABLE "Publications" DROP COLUMN ${vectorName};
              `, { transaction: t })))))
  ),
};
