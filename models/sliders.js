'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sliders = sequelize.define('Sliders', {
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Sliders.associate = function(models) {
    // associations can be defined here
  };
  return Sliders;
};