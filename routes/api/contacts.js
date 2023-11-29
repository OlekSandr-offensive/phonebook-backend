const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const {
  authenticate,
  validationBody,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.add),
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

// router.put(
//   "/:contactId",
//   isValidId,
//   validationBody(schemas.addSchema),
//   ctrlWrapper(ctrl.updateById),
// );

// router.patch(
//   "/:contactId/favorite",
//   isValidId,
//   validationBody(schemas.updateFavoriteSchema),
//   ctrlWrapper(ctrl.updateFavorite),
// );

module.exports = router;
