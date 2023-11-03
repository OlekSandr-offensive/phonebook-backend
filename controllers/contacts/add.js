const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  // const { _id: owner } = req.user;
  const body = req.body;

  const result = await Contact.create({ ...body });
  res.status(201).json(result);
};

module.exports = add;
