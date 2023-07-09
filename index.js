const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    case "get":
      const reqContact = await getContactById(id);
      return console.log(reqContact);

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const delContact = await removeContact(id);
      return console.log(delContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
