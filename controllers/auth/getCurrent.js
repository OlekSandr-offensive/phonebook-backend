const jwt = require("jsonwebtoken");

const { Contact } = require("../../models/contact");
const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const getCurrent = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { id } = jwt.verify(token, SECRET_KEY);
  const user = await User.findById(id);
  if (!user || !user.token) {
    RequestError(401, "Unauthorized");
  }
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt");

  res.json({
    name: user.name,
    email: user.email,
    result: result,
  });
};

module.exports = getCurrent;
