

module.exports = (sequelize, DataTypes) => {
  const Rates = sequelize.define('Rates', {
    period: DataTypes.STRING,
    rate: DataTypes.FLOAT,
    term: DataTypes.INTEGER,
  }, { timestamps: false });
  Rates.associate = function (models) {
    // associations can be defined here
  };
  return Rates;
};
