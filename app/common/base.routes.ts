import express, { Router } from "express";
import { NextFunction, Request, Response } from "express";
import registry from "../registry";
import { CatchAsync } from "../utils/catchAsync";
import { BaseController } from "./base.controller";


export class AppRoutes {

    router: Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes() {
        
        // this.router.post("/test", this.test);

        this.router
          .route("/")
          .get(this.list)
          .put(this.create)
          .post(this.custom)
          .patch(this.update)
          .delete(this.delete);
    }

    getMethod(req: Request) {
        const chunks = req.baseUrl.split('/');
        let method = null;
        if (chunks.length === 4) {
            method = chunks[3];
        }
        return method;
    }

    getController(req: Request) {
        const chunks = req.baseUrl.split('/');
        const slug = chunks[2];        
        const Controller = registry.getController(slug);
        if (Controller !== null) {
            const ctrl: BaseController = new Controller();
            ctrl.context = req;
            return ctrl;
        }
        return null;
    }

    custom = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        const ctrl: BaseController | null = this.getController(req);
        let resp = null;
        if (ctrl != null) {
            const method = this.getMethod(req);
            if (method !== null && ctrl.publicMethods.includes(method)) {
                resp = await (ctrl as any)[method]();
                this.sendSuccessResponse(res, resp);
            }
            else {
                this.sendErrorResponse(res, resp);
            }
        }
        else {
            this.sendErrorResponse(res, resp);
        }
    }))

    list = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        const ctrl: BaseController | null = this.getController(req);
        let resp = null;
        if (ctrl != null) {
            resp = await ctrl.list();
            this.sendSuccessResponse(res, resp);
        }
        else {
            this.sendErrorResponse(res, resp);
        }
    }))

    single = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        const ctrl: BaseController | null = this.getController(req);
        let resp = null;
        if (ctrl != null) {
            resp = await ctrl.single();
            this.sendSuccessResponse(res, resp);
        }
        else {
            this.sendErrorResponse(res, resp);
        }
    }))

    create = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        const ctrl: BaseController | null = this.getController(req);
        let resp = null;
        if (ctrl != null) {
            resp = await ctrl.create();
            this.sendSuccessResponse(res, resp);
        }
        else {
            this.sendErrorResponse(res, resp);
        }
    }))

    update = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        const ctrl: BaseController | null = this.getController(req);
        let resp = null;
        if (ctrl != null) {
            resp = await ctrl.update();
            this.sendSuccessResponse(res, resp);
        }
        else {
            this.sendErrorResponse(res, resp);
        }
    }))

    delete = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        const ctrl: BaseController | null = this.getController(req);
        let resp = null;
        if (ctrl != null) {
            resp = await ctrl.delete();
            this.sendSuccessResponse(res, resp);
        }
        else {
            this.sendErrorResponse(res, resp);
        }
    }))

    sendSuccessResponse(res: Response, data: any) {
        res.status(200).json({
            status: 'Ok',
            data: data
        });
    }

    sendErrorResponse(res: Response, data: any) {
        res.status(500).json({
            status: 'Error',
            data: data
        });
    }
}
