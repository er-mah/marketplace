

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    agencyName: DataTypes.STRING,
    agencyAdress: DataTypes.STRING,
    agencyEmail: DataTypes.STRING,
    agencyPhone: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    bannerImage: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return User;
};
