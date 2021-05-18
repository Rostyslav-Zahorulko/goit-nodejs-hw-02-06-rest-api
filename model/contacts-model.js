const mongoose = require("mongoose");
const contactSchema = require("../model/schemas/contact-schema");

const Contact = mongoose.model("contact", contactSchema);

const getAll = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

const getById = async (id) => {
  const contact = await Contact.findOne({ _id: id });

  return contact;
};

const create = async (body) => {
  const contact = await Contact.create({ ...body });

  return contact;
};

const remove = async (id) => {
  const contact = await Contact.findByIdAndRemove({ _id: id });

  return contact;
};

const update = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );

  return contact;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
