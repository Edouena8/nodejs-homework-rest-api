const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const removeContact = async (req, res, __) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found. Contact with such id didn't exist");
  }

  res.status({
    message: "contact deleted",
  });
};

module.exports = ctrlWrapper(removeContact);
