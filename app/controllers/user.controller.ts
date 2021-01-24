import { sign } from 'jsonwebtoken';
import md5 from "md5"

import { User } from '../models/user.model'
import { BaseController } from '../common/base.controller';


export class UserController extends BaseController {
    
    constructor() {
        super()
        this.model = User;
        this.publicMethods.push('test');
        this.publicMethods.push('login');
    }

    async test() {
        console.log(this.context?.body)
        return 'test ok';
    }

    async single() {
        const data = await super.single();
        data.password = '<<<encrypted>>>';
        return data;
    }

    async create() {
        const data = this.context?.body;
        data.password = md5(data.password);
        return await super.create_record(data);
    }

    async update() {
        const data = this.context?.body;
        if (data.password !== '<<<encrypted>>>') {
            data.password = md5(data.password);
        }
        else {
            delete data.password;
        }
        return await super.update_record(data);
    }

    async delete() {
        const id = this.context?.body.id;
        return await super.delete_record(id);
    }

    async login() {
        // const {
        //     email,
        //     password
        // } = req.body;

        // if (!email || !password) {
        //     res.status(404).json({
        //         status: "failed"
        //     });
        // }
        // const user: User | null = await User.findOne < User > ({
        //     where: {
        //         email
        //     }
        // });

        // if (!user || !(await user.verifyPassword(password))) {
        //     res.status(404).json({
        //         status: "failed"
        //     });
        // } else {
        //     this.createSendToken(user, 200, req, res);
        // }
    }

    // login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //     const {
    //         email,
    //         password
    //     } = req.body;

    //     if (!email || !password) {
    //         res.status(404).json({
    //             status: "failed"
    //         });
    //     }
    //     const user: User | null = await User.findOne < User > ({
    //         where: {
    //             email
    //         }
    //     });

    //     if (!user || !(await user.verifyPassword(password))) {
    //         res.status(404).json({
    //             status: "failed"
    //         });
    //     } else {
    //         this.createSendToken(user, 200, req, res);
    //     }
    // });

    // signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //     let newUser: User = await User.create(req.body);
    //     await newUser.hashPassword();
    //     newUser = await newUser.save();
    //     this.createSendToken(newUser, 201, req, res);
    // });

    // getAllUsers = catchAsync(async (req: Request, res: Response) => {
    //     const users = await User.findAll({
    //         attributes: {
    //             exclude: ["password"]
    //         }
    //     });
    //     res.status(200).json({
    //         status: "ok",
    //         users
    //     });
    // });

    // updateUser = catchAsync(async (req: Request, res: Response) => {
    //     const {
    //         user_id
    //     } = req.body;
    //     await User.update(req.body, {
    //         where: {
    //             user_id
    //         }
    //     });

    //     res.status(200).json({
    //         status: "Updated"
    //     });
    // });

    // deleteUser = catchAsync(async (req: Request, res: Response) => {
    //     const {
    //         user_id
    //     } = req.body;
    //     await User.destroy({
    //         where: {
    //             user_id
    //         }
    //     });

    //     res.status(200).json({
    //         status: "Deleted"
    //     });
    // });

    // signToken(id: string | number) {
    //     return sign({
    //         id
    //     }, process.env.JWT_SECRET || '', {
    //         expiresIn: process.env.JWT_TOKEN_EXPIRY,
    //     });
    // };

    // createSendToken = (user: User, statusCode: number, req: Request, res: Response) => {
    //     const token = this.signToken(user.user_id);
    //     // Remove password from output
    //     // user.password = undefined;

    //     res.status(statusCode).json({
    //         status: "success",
    //         token,
    //         data: {
    //             user,
    //         },
    //     });
    // };
}
