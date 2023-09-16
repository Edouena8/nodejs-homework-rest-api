const Jimp = require("jimp");

const modifyImage = async (imagePath) => {
  const image = Jimp.read(imagePath);
  await image.resize(250, 250);
};

module.exports = modifyImage;
