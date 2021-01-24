import { verify } from 'jsonwebtoken';

import { AppRoutes } from "../common/base.routes";
import { AuthSession } from "../models/auth_session.model";


export class ApiRoutes extends AppRoutes {

    getMethod(req: any) {
        const chunks = req.baseUrl.split('/');
        let method = null;
        if (chunks.length === 3) {
            method = chunks[2].toLowerCase();
        }
        return method;
    }

    async decodeSession(req: any): Promise<any> {

        const token = req.headers.authorization || null;
        if (token == null) {
            return null;
        }

        const st: any = verify(token, process.env.JWT_SECRET || '');
        console.log(st); // bar

        let session: AuthSession | null = await AuthSession.findOne < AuthSession > ({
            where: {
                session_id: st.sessionId
            }
        });
        
        if (session != null) {
            return st;
        }

        return null;
    }
}
