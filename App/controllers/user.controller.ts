import { NextFunction } from 'express';
import {sign} from 'jsonwebtoken';
import User from '../models/user.model'
import catchAsync from '../utils/catchAsync';
import baseController from './baseController';


class userController extends baseController {
  signToken(id: string | number){
    return sign({ id }, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });
  };

  login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

  createSendToken = (user:User, statusCode: number, req: Request, res: Response) => {
    const token = this.signToken(user.user_id);
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
}

exports.

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
