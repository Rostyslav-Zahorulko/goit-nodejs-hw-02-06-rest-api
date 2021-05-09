const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const getAll = async () => {
  const data = await fs.readFile(contactsPath, (error) => {
    if (error) throw error;
  });

  const contacts = JSON.parse(data);

  return contacts;
};

const getById = async (id) => {
  const data = await fs.readFile(contactsPath, (error) => {
    if (error) throw error;
  });

  const contacts = JSON.parse(data);

  const foundContact = contacts.find((contact) => contact.id.toString() === id);

  return foundContact;
};

const create = async (body) => {
  const data = await fs.readFile(contactsPath, (error) => {
    if (error) throw error;
  });

  const contacts = JSON.parse(data);

  const id = uuidv4();

  const createdContact = {
    id,
    ...body,
  };

  contacts.push(createdContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) throw error;
  });

  return createdContact;
};

const remove = async (id) => {
  const data = await fs.readFile(contactsPath, (error) => {
    if (error) throw error;
  });

  const contacts = JSON.parse(data);

  const filteredContacts = contacts.filter(
    (contact) => contact.id.toString() !== id
  );

  const removedContact = contacts.find(
    (contact) => contact.id.toString() === id
  );

  if (filteredContacts.length !== contacts.length && removedContact) {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts),
      (error) => {
        if (error) throw error;
      }
    );

    return removedContact;
  }

  return undefined;
};

const update = async (id, body) => {
  const data = await fs.readFile(contactsPath, (error) => {
    if (error) throw error;
  });

  const contacts = JSON.parse(data);

  const foundContact = contacts.find((contact) => contact.id.toString() === id);

  if (foundContact) {
    const updatedContact = {
      ...foundContact,
      ...body,
    };

    const mappedContacts = contacts.map((contact) => {
      if (contact.id !== updatedContact.id) {
        return contact;
      } else {
        return updatedContact;
      }
    });

    await fs.writeFile(
      contactsPath,
      JSON.stringify(mappedContacts),
      (error) => {
        if (error) throw error;
      }
    );

    return updatedContact;
  }

  return undefined;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
