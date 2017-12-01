
module.exports = {
  production: {
    url: process.env.DATABASE_URL,
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    operatorsAliases: false,    
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'cinesis_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    seederStorage: 'sequelize',
    operatorsAliases: false,
  },
  development: {
    username: 'root',
    password: 'root',
    database: 'cinesis_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,    
  },
};
