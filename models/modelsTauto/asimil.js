/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const asimil = sequelize.define('asimil', {
    asi_codia: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    asi_marca: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    asi_model: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    asi_codas: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    asi_marcs: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    asi_modes: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
  }, {
    tableName: 'asimil',
  });
  return asimil;
};

