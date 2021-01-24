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
}
