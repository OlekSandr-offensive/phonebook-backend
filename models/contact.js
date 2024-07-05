const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const phoneRegexp =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for a contact"],
      unique: true,
      min: 3,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Set number for a contact"],
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post("save", handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const schemas = {
  addSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
