const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (_, res, __) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, __) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, __) => {
  const data = req.body;

  const result = await contacts.addContact(data);
  res.status(201).json(result);
};

const removeContact = async (req, res, __) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status({
    message: "contact deleted",
  });
};

const updateContact = async (req, res, __) => {
  const data = req.body;

  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, data);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
