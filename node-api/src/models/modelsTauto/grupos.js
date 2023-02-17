/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const grupos = sequelize.define('grupos', {
    gru_nmarc: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    gru_cgrup: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    gru_ngrup: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  }, {
    tableName: 'grupos',
    timestamps: false,
  });
  return grupos;
};
