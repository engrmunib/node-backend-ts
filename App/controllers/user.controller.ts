import {Request, Response, NextFunction } from 'express';
import {sign} from 'jsonwebtoken';
import User, {userInterface} from '../models/user.model'
import catchAsync from '../utils/catchAsync';
import baseController from './base.controller';


export default class userController extends baseController {

  constructor(){
    super(User)
  }

  login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if (!email || !password) {
      res.status(404).json({ status: "failed" });
    }
    const user: User | null = await User.findOne<User>({
      where: { email }
    });
  
    if (!user || !(await user.verifyPassword(password, user.password || ''))) {
      res.status(404).json({ status: "failed" });
    }
    else{
      this.createSendToken(user, 200, req, res);
    }
  });

  signup = catchAsync(async (req:Request, res: Response, next: NextFunction) => {
    let newUser:User = await User.create(req.body);
    await newUser.hashPassword();
    newUser = await newUser.save();
    this.createSendToken(newUser, 201, req, res);
  });

  getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({ status: "ok", users });
  });

  updateUser = catchAsync(async (req: Request, res: Response) => {
    const {user_id} = req.body;
    await User.update(req.body,{where:{user_id}});
  
    res.status(200).json({ status: "Updated" });
  });

  deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.body;
    await User.destroy({where: {user_id}});
  
    res.status(200).json({ status: "Deleted" });
  });

  signToken(id: string | number){
    return sign({ id }, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });
  };

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
