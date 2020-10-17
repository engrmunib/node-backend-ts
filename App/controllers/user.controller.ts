import jwt from 'jsonwebtoken';
const { User } = require("../models/user.model");
const catchAsync = require("../utils/catchAsync")

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.user_id);

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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({ status: "failed" });
  }
  const user = await User.findOne({
    where: { email }
  });

  if (!user || !(await user.verifyPassword(password, user.password))) {
    res.status(404).json({ status: "failed" });
  }
  createSendToken(user, 200, req, res);
});

//Basic CRUD

exports.signup = catchAsync(async (req, res, next) => {
  let newUser = await User.create(req.body);
  await newUser.hashPassword();
  newUser = await newUser.save();
  createSendToken(newUser, 201, req, res);
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.status(200).json({ status: "ok", users });
});

exports.updateUser = catchAsync(async (req, res) => {
  const {user_id} = req.body;
  await User.update(req.body,{where:{user_id}});

  res.status(200).json({ status: "Updated" });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user_id } = req.body;
  await User.destroy({where: {user_id}});

  res.status(200).json({ status: "Deleted" });
});
