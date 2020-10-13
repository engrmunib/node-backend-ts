const jwt = require("jsonwebtoken");
const { User } = require("./user.model");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};


exports.signup = async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, req, res);
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({ status: "failed" });
  }
  const user = await User.findOne({ email }).select(
    "+password"
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(404).json({ status: "failed" });
  }
  createSendToken(user, 200, req, res);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json({ status: "ok", users });
}

exports.updateUser = async (req, res) => {
  const {email} = req.body;
  await User.findOneAndUpdate({email:email},req.body)

  res.status(200).json({ status: "Updated"});
}

exports.deleteUser = async (req, res) => {
  const {email} = req.body;
  await User.findOneAndDelete({email:email})

  res.status(200).json({ status: "Deleted"});
}