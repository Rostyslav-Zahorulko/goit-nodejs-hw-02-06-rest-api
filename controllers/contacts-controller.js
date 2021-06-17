const contactsModel = require("../model/contacts-model");
const { httpCode } = require("../helpers/constants");

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contacts, total, limit, page } = await contactsModel.getAll(
      userId,
      req.query
    );

    return res.status(httpCode.OK).json({
      status: "success",
      code: httpCode.OK,
      data: { total, limit, page, contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;
    const contact = await contactsModel.getById(userId, contactId);

    if (contact) {
      return res.status(httpCode.OK).json({
        status: "success",
        code: httpCode.OK,
        data: { contact },
      });
    }

    return res.status(httpCode.NOT_FOUND).json({
      status: "error",
      code: httpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsModel.create({ ...req.body, owner: userId });

    return res.status(httpCode.CREATED).json({
      status: "success",
      code: httpCode.CREATED,
      data: { contact },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      error.code = httpCode.BAD_REQUEST;
      error.status = "error";
    }

    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;
    const contact = await contactsModel.remove(userId, contactId);

    if (contact) {
      return res.status(httpCode.OK).json({
        status: "success",
        code: httpCode.OK,
        data: { contact },
      });
    }

    return res.status(httpCode.NOT_FOUND).json({
      status: "error",
      code: httpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;
    const contact = await contactsModel.update(userId, contactId, req.body);

    if (contact) {
      return res.status(httpCode.OK).json({
        status: "success",
        code: httpCode.OK,
        data: { contact },
      });
    }

    return res.status(httpCode.NOT_FOUND).json({
      status: "error",
      code: httpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      error.code = httpCode.BAD_REQUEST;
      error.status = "error";
    }

    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
};
