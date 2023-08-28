const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");
const listContacts = async (_, res, __) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res, __) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, __) => {
  const data = req.body;

  const result = await Contact.create(data);
  res.status(201).json(result);
};

const removeContact = async (req, res, __) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
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
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res, __) => {
  const data = req.body;

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
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
  updateFavorite: ctrlWrapper(updateFavorite),
};
