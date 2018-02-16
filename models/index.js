

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};
db.mah = {};
db.tauto = {};
let sequelizeMah;
let sequelizeTauto;

if (config.mah_db && config.tauto_db) {
  sequelizeMah = new Sequelize(config.mah_db.url, config.mah_db);
  sequelizeTauto = new Sequelize(config.tauto_db.url, config.tauto_db);
} else {
  sequelizeMah = new Sequelize(config.databases.mah_test, config.username, config.password, config);
  sequelizeTauto = new Sequelize(config.databases.tauto, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelizeMah.import(path.join(__dirname, file));
    db.mah[model.name] = model;
  });

Object.keys(db.mah).forEach((modelName) => {
  if (db.mah[modelName].associate) {
    db.mah[modelName].associate(db);
  }
});

db.mah.sequelize = sequelizeMah;
db.Sequelize = Sequelize;

fs
  .readdirSync(`${__dirname}/modelsTauto`)
  .filter(file => (file.indexOf('./modelsTauto') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelizeTauto.import(path.join(`${__dirname}/modelsTauto`, file));
    db.tauto[model.name] = model;
  });

Object.keys(db.tauto).forEach((modelName) => {
  if (db.tauto[modelName].associate) {
    db.tauto[modelName].associate(db);
  }
});

db.tauto.sequelize = sequelizeTauto;
db.Sequelize = Sequelize;

module.exports = db;
