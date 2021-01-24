import { AppRoutes } from "../common/base.routes";
import { AuthController } from "../controllers/auth.controller";



export class AuthRoutes extends AppRoutes {

    // async login() {
    //     const model = AuthSession;
    //     const {
    //         username,
    //         password
    //     } = this.context?.body;

    //     if (!username || !password) {
    //         throw new AppError(401, 'Username Password combination mismatch');

    //     }
    // }

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

    routes3() {
        
        this.router.post("/login", this.other);

        // this.router
        //   .route("/")
        //   .get(this.fetch)
        // //   .put(this.create)
        //   .post(this.other)
        // //   .patch(this.update)
        //   .delete(this.delete);
    }
}