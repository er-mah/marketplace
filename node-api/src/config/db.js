import {Sequelize} from "sequelize";
import {config} from "dotenv";

config();

// TODO: REFACTOR THIS TO WORK IN PRODUCTION
export const dbData = {

  /*
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
  },
    
  test: {
    username: "postgres",
    password: "root",
    database: "mah_test",
    host: "127.0.0.1",
    dialect: "postgres",
    seederStorage: "sequelize",
    operatorsAliases: false,
    databases: {
      tauto: "tautos",
      mah_test: "mah_test",
    },
    //logging: 'true',
  },
  */

  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST
  },

};

/*
const db = {
  techmoMktplace: {},
};

// Conexión a la base de datos Mah
let sequelizeMah;
if (config.techmoMktplace && config.tauto_db) {
  sequelizeMah = new Sequelize(config.mah_db.url, config.mah_db);
} else {
  sequelizeMah = new Sequelize(
      config.databases.mah_test,
      config.username,
      config.password,
      config
  );
}

// Carga de modelos de la base de datos Mah
const modelsMahDir = path.join(__dirname, 'modelsMah');
fs.readdirSync(modelsMahDir)
    .filter(file => (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    ))
    .forEach(file => {
      const model = sequelizeMah.import(path.join(modelsMahDir, file));
      db.techmoMktplace[model.name] = model;
    });

// Asociación de modelos de la base de datos Mah
Object.keys(db.techmoMktplace).forEach(modelName => {
  if (db.techmoMktplace[modelName].associate) {
    db.techmoMktplace[modelName].associate(db);
  }
});

// Exportación de objetos Sequelize y modelos de la base de datos
db.techmoMktplace.sequelize = sequelizeMah;
db.Sequelize = Sequelize;
*/

const env = process.env.NODE_ENV || "development";
const configuration = dbData[env];

export const db = new Sequelize(
    configuration.database,
    configuration.username,
    configuration.password, {
      host: configuration.host,
      dialect: 'postgres',
      operatorsAliases: false,
    }
);