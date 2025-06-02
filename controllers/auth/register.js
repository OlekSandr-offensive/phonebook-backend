const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ email }, { name }]
  });
  if (user) {
    if (user.email === email) {
      throw RequestError(409, `User with email ${email} already exists`);
    }
    if (user.name === name) {
      throw RequestError(409, `User with name ${name} already exists`);
    }
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const profile_img = gravatar.url(email, { d: "mp" });
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    profile_img,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = register;
