const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const read = async () => {
  const result = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(result);
};

const write = async (data) => {
  return await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
  return await read();
};

const getContactById = async (contactId) => {
  const contacts = await read();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await read();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) return null;

  contacts.splice(idx, 1);
  await write(contacts);
  return contacts[idx];
};

const addContact = async (body) => {
  const contacts = await read();

  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };

  contacts.push(newContact);
  await write(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await read();

  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) return null;

  contacts[idx] = {
    id: contactId,
    ...body,
  };

  await write(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
