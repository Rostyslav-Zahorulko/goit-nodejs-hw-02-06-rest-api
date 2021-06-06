const express = require("express");
const guard = require("../../../helpers/guard");
const {
  validateContactCreation,
  validateContactUpdation,
  validateContactStatusUpdation,
} = require("./contacts-validation");
const contactsController = require("../../../controllers/contacts-controller");

const contactsRouter = express.Router();

contactsRouter.get("/", guard, contactsController.getAllContacts);

contactsRouter.get("/:id", guard, contactsController.getContactById);

contactsRouter.post(
  "/",
  guard,
  validateContactCreation,
  contactsController.createContact
);

contactsRouter.delete("/:id", guard, contactsController.removeContact);

contactsRouter.put(
  "/:id",
  guard,
  validateContactUpdation,
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  guard,
  validateContactStatusUpdation,
  contactsController.updateContact
);

module.exports = contactsRouter;
