const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const phoneRegexp = /^[(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for a contact"],
      unique: true,
      min: 3,
    },
    number: {
      type: String,
      required: [true, "Set number for a contact"],
      unique: true,
    },
  },
  { versionKey: false, timestamps: true },
);

// contactSchema.post("save", handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  number: Joi.string().min(3).max(30).required(),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const schemas = {
  addSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
