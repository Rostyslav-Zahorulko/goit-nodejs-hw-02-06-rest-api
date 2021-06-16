const express = require("express");
const guard = require("../../../helpers/guard");
const { validateUserSubscriptionUpdation } = require("./users-validation");
const usersController = require("../../../controllers/users-controller");
const upload = require("../../../helpers/upload");

const usersRouter = express.Router();

usersRouter.post("/signup", usersController.signup);

usersRouter.post("/login", usersController.login);

usersRouter.post("/logout", guard, usersController.logout);

usersRouter.patch(
  "/update",
  guard,
  validateUserSubscriptionUpdation,
  usersController.update
);

usersRouter.patch(
  "/avatars",
  [guard, upload.single("avatar")],
  usersController.avatars
);

usersRouter.get("/verify/:token", usersController.verify);

usersRouter.post("/verify", usersController.resendVerificationEmail);

module.exports = usersRouter;
