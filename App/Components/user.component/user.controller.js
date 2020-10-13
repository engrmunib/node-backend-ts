const jwt = require("jsonwebtoken");
const { User, Social } = require("./user.model");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const signToken = (id) => {
  return jwt.sign({ id }, "dejavu", {
    expiresIn: "6d",
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
  // 1) Check if email and password exist
  if (!email || !password) {
    res.status(404).json({ status: "failed" });
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select(
    "+password"
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(404).json({ status: "failed" });
  }

  // 3) If everything ok, send token to client
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