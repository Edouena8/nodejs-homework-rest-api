const { Contact } = require("../../models/contact");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getContactById = async (req, res, __) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = ctrlWrapper(getContactById);
