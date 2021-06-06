const mongoose = require("mongoose");
const userSchema = require("./schemas/user-schema");

const User = mongoose.model("user", userSchema);

const getById = async (id) => {
  const user = await User.findOne({ _id: id });

  return user;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

const create = async (options) => {
  const user = new User(options);

  return await user.save();
};

const updateToken = async (id, token) => {
  const user = await User.updateOne({ _id: id }, { token });

  return user;
};

const updateSubscription = async (id, body) => {
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );

  return user;
};

module.exports = {
  getById,
  getByEmail,
  create,
  updateToken,
  updateSubscription,
};
