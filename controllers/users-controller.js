const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersModel = require("../model/users-model");
const { httpCode } = require("../helpers/constants");
const AvatarLocalUpload = require("../services/avatars-local-upload");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const USERS_AVATARS = process.env.USERS_AVATARS;

const signup = async (req, res, next) => {
  try {
    const user = await usersModel.getByEmail(req.body.email);

    if (user) {
      return res.status(httpCode.CONFLICT).json({
        status: "error",
        code: httpCode.CONFLICT,
        message: "Email is already used",
      });
    }

    const newUser = await usersModel.create(req.body);
    const { id, password, email, subscription, avatar } = newUser;

    return res.status(httpCode.CREATED).json({
      status: "success",
      code: httpCode.CREATED,
      data: { id, password, email, subscription, avatar },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await usersModel.getByEmail(req.body.email);
    const isPasswordValid = await user?.validPassword(req.body.password);

    if (!user || !isPasswordValid) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: "error",
        code: httpCode.UNAUTHORIZED,
        message: "Invalid credentials",
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });
    await usersModel.updateToken(user.id, token);

    return res.status(httpCode.OK).json({
      status: "success",
      code: httpCode.OK,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  await usersModel.updateToken(req.user.id, null);
  return res.status(httpCode.NO_CONTENT).json({});
};

const update = async (req, res, next) => {
  try {
    const user = await usersModel.updateSubscription(req.user.id, req.body);

    if (user) {
      return res.status(httpCode.OK).json({
        status: "success",
        code: httpCode.OK,
        data: { user },
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

const avatars = async (req, res, next) => {
  try {
    const upload = new AvatarLocalUpload(USERS_AVATARS);
    const avatarUrl = await upload.saveAvatarToStatic({
      userId: req.user.id,
      filePath: req.file.path,
      fileName: req.file.filename,
      oldFile: req.user.avatar,
    });

    await usersModel.updateAvatar(req.user.id, avatarUrl);

    return res.status(httpCode.OK).json({
      status: "success",
      code: httpCode.OK,
      data: { avatarUrl },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  update,
  avatars,
};
