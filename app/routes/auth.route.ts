import { AppRoutes } from "../common/base.routes";
import { AuthController } from "../controllers/auth.controller";


export class AuthRoutes extends AppRoutes {

    getMethod(req: any) {
        const chunks = req.baseUrl.split('/');
        let method = null;
        if (chunks.length === 3) {
            method = chunks[2].toLowerCase();
        }
        return method;
    }

    getController(req: any) {
        const ctrl = new AuthController();
        ctrl.context = req;
        ctrl.transaction = this.transaction;
        return ctrl;
    }

    async decodeSession(req: any): Promise<any> {
        return {'sessionId': 'valid'};
    }
}
