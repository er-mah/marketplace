

module.exports = (sequelize, DataTypes) => {
  const ImageGroup = sequelize.define('ImageGroup', {
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING,
    image5: DataTypes.STRING,
    image6: DataTypes.STRING,
    image7: DataTypes.STRING,
    image8: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return ImageGroup;
};
