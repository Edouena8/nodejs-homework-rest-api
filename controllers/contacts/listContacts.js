const { Contact } = require("../../models/contact");
const {  ctrlWrapper } = require("../../helpers");

const listContacts = async (_, res, __) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = ctrlWrapper(listContacts);