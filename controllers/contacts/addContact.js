const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const addContact = async (req, res, __) => {
  const { data } = req.body;
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...data, owner });
  res.status(201).json(result);
};

module.exports = ctrlWrapper(addContact);
