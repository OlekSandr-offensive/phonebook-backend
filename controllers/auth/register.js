const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, `User with ${email} already exists`);
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
