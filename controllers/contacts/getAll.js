const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner },
    {
      skip,
    },
    { limit: Number(limit) },
    { createdAt: "created_at", updatedAt: "updated_at" },
  ).populate("owner", "name email");
  res.json(result);
};

module.exports = getAll;
