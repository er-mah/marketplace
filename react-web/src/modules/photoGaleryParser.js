export default (imageGroup) => {
  const photoGalery = [];
  Object.keys(imageGroup).forEach((item) => {
    if (imageGroup[item] && item !== '__typename') {
      photoGalery.push({ src: `${process.env.REACT_APP_API}/images/${imageGroup[item]}`, atlText: imageGroup[item] });
    }
  });
  return photoGalery;
};
