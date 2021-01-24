import express, { Application, Request, Response } from 'express';
import ErrorHandler from './utils/errorHandler';
import bodyParser from "body-parser";
import registry from './registry';
// import { AppRoutes } from './common/base.routes';
import { UserController } from './controllers/user.controller';
import { AuthRoutes } from './routes/auth.route';
import { ApiRoutes } from './routes/api.route';


class App {

    app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routing();
    }

    private config() {
        this.app.use(bodyParser.json());
        this.app.use(ErrorHandler);
    }

    private routing() {

        // register all controllers here
        registry.registerController('users', UserController);
        // add other here ...

        this.app.use("/auth/*", new AuthRoutes().router);
        this.app.use("/api/*", new ApiRoutes().router);

        this.app.all("*", (req: Request, res: Response) => {
            res.status(404).send({
                message: `Can't find ${req.originalUrl} on this server!`,
            });
        });
    }
}

export default new App().app;
