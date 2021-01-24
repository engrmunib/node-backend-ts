import { sign } from 'jsonwebtoken';

import AppError from '../utils/errors';
import { User } from '../models/user.model'
import { BaseController } from '../common/base.controller';
import { AuthSession } from '../models/auth_session.model';
import { currentTime, uuidv4 } from '../utils/functions';


export class AuthController extends BaseController {
    
    constructor() {
        super()
        this.publicMethods.push('login');
    }

    async login() {

        // const model = AuthSession;
        const {
            username,
            password
        } = this.context?.body;

        if (!username || !password) {
            throw new AppError(401, 'Username Password combination mismatch');
        }

        const user: User | null = await User.findOne < User > ({
            where: {
                username
            }
        });

        if (!user || !(user.verifyPassword(password))) {
            throw new AppError(401, 'Username Password combination mismatch');
        } 

        let session: AuthSession | null = await AuthSession.findOne < AuthSession > ({
            where: {
                user_id: user.user_id
            }
        });
        
        let sessionId = null;

        if (!session) {
            const rec = {
                session_id: uuidv4(),
                user_id: user.user_id,
                date_added: currentTime()
            }
            console.log(rec);
            const doc = await AuthSession.create(rec, {transaction: this.transaction});
            sessionId = doc.session_id
        }
        else {
            session!.date_updated = currentTime();
            await session!.save({transaction: this.transaction})
            sessionId = session!.session_id;
        }

        const token = sign({sessionId}, process.env.JWT_SECRET || '', {
            expiresIn: process.env.JWT_TOKEN_EXPIRY,
        });

            // this.createSendToken(user, 200, req, res);
        return {'Token': token};
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
