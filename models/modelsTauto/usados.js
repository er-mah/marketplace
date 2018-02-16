/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const usados = sequelize.define('usados', {
    usa_codia: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    usa_valor: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    usa_model: {
      type: DataTypes.STRING(90),
      allowNull: true,
    },
  }, {
    tableName: 'usados',
    timestamps: false,
  });
  usados.removeAttribute('id');
  return usados;
};
