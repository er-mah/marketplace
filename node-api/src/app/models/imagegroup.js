

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
    image9: DataTypes.STRING,
    image10: DataTypes.STRING,
    image11: DataTypes.STRING,
    image12: DataTypes.STRING,
    image13: DataTypes.STRING,
    image14: DataTypes.STRING,
    image15: DataTypes.STRING,
    image16: DataTypes.STRING,
    image17: DataTypes.STRING,
    image18: DataTypes.STRING,
    image19: DataTypes.STRING,
    image20: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return ImageGroup;
};
