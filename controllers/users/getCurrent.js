const {ctrlWrapper} = require("../../helpers");

const getCurrent = (req, res) => {
  const { name, email, subscription } = req.user;

  res.json({ name, email, subscription });
};

module.exports = ctrlWrapper(getCurrent);
