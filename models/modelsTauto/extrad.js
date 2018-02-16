/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const extrad = sequelize.define('extrad', {
    ext_codia: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    ext_combu: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    ext_alime: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    ext_motor: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ext_puert: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    ext_clasi: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    ext_cabin: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    ext_carga: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    ext_pesot: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ext_veloc: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ext_poten: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ext_direc: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    ext_airea: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ext_tracc: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    ext_impor: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ext_cajav: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    ext_frabs: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    ext_airba: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
  }, {
    tableName: 'extrad',
    timestamps: false,
  });
  
  return extrad;
};
