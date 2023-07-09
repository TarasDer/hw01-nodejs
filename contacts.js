const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const reqContact = contacts.find(({ id }) => contactId === id);
  return reqContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => contactId === id);
  if (index === -1) {
    return null;
  }
  const [reqContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return reqContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
