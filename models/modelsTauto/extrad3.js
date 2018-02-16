/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const extrad3 = sequelize.define('extrad3', {
    ex3_codia: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    ex3_tapcu: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_aelec: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_cabor: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_fxeno: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_lalea: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_tpano: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_slluv: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_screp: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_ipneu: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_vleva: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_bluet: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_aterm: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ex3_rflat: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
  }, {
    tableName: 'extrad3',
    timestamps: false,
  });
  extrad3.removeAttribute('id');
  return extrad3;
};
