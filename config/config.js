
module.exports = {
  production: {
    url: process.env.DATABASE_URL,
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    operatorsAliases: false,
    mah_db: {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      operatorsAliases: false
    },
    tauto_db: {
      url: process.env.TAUTO_DATABASE_URL,
      dialect: 'postgres',
      operatorsAliases: false
    },
  },
  test: {
    username: 'postgres',
    password: 'root',
    database: 'mah_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    operatorsAliases: false,
    databases: {
      tauto: 'tautos',
      mah_test: 'mah_test',
    },
  },
  testpsql: {
    username: 'postgres',
    password: 'root',
    database: 'mah_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    operatorsAliases: false,
    databases: {
      tauto: 'tautos',
      mah_test: 'mah_test',
    },
  },
  development: {
    username: 'root',
    password: 'root',
    database: 'mah_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },

};
