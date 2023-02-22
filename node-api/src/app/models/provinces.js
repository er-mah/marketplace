'use strict';
module.exports = (sequelize, DataTypes) => {
  var Provinces = sequelize.define('Provinces', {
    name: DataTypes.STRING
  }, {timestamps: false});
  Provinces.associate = function(models) {
  };
  return Provinces;
};