const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateContact = async (req, res, __) => {
  const data = req.body;

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found.  Contact with such id doesn't exist");
  }

  res.json(result);
};

module.exports = ctrlWrapper(updateContact);