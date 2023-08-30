const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts");
const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
