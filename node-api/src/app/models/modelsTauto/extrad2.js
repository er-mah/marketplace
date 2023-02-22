/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const extrad2 = sequelize.define('extrad2', {
    ex2_codia: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    ex2_clima: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    ex2_fanti: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_tcorr: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_sesta: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_alate: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_acabe: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_acort: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_arodi: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_isofi: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_ctrac: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_cesta: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_cdesc: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_sapen: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_cdina: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_bdife: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_relef: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_afree: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_rparf: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex2_largo: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ex2_ancho: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ex2_alto: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
  }, {
    tableName: 'extrad2',
    timestamps: false,
  });
  return extrad2;
};
