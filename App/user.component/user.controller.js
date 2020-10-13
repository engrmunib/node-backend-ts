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
  console.log("email, pass", email, password);
  // 1) Check if email and password exist
  if (!email || !password) {
    res.status(404).json({ status: "failed" });
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select(
    "+password -currentBookings"
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(404).json({ status: "failed" });
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
};
