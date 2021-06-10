const mongoose = require("mongoose");
const contactSchema = require("../model/schemas/contact-schema");

const Contact = mongoose.model("contact", contactSchema);

const getAll = async (userId, query) => {
  const { limit = 5, page = 1, favorite = null } = query;

  const searchOptions = { owner: userId };

  if (favorite !== null) {
    searchOptions.favorite = favorite;
  }

  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    searchOptions,
    { limit, page }
  );

  return { contacts, total, limit, page };
};

const getById = async (userId, contactId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({ path: "owner", select: "email subscription" });

  return contact;
};

const create = async (body) => {
  const contact = await Contact.create({ ...body });

  return contact;
};

const remove = async (userId, contactId) => {
  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });

  return contact;
};

const update = async (userId, contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
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
