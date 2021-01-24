import express, { Router } from "express";
import { NextFunction, Request, Response } from "express";
import registry from "../registry";
import { CatchAsync } from "../utils/catchAsync";
import { BaseController } from "./base.controller";
import sequelize from '../db'
import { Transaction } from "sequelize/types";


export class AppRoutes {

    router: Router;
    transaction?: Transaction

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        
        // this.router.post("/test", this.test);

        this.router
          .route("/")
          .get(this.fetch)
        //   .put(this.create)
          .post(this.other)
        //   .patch(this.update)
          .delete(this.delete);
    }

    getMethod(req: Request) {
        const chunks = req.baseUrl.split('/');
        let method = null;
        if (chunks.length === 4) {
            method = chunks[3].toLowerCase();
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
            ctrl.transaction = this.transaction;
            return ctrl;
        }
        return null;
    }

    fetch = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        
        let method = 'all';
        if ('id' in req.query) {
            method = 'single';
        }
        
        await this.runInTransaction(method, req, res);
    }))

    // create = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
    //     await this.runInTransaction('create', req, res);
    // }))

    // update = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
    //     await this.runInTransaction('update', req, res);
    // }))

    delete = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        await this.runInTransaction('delete', req, res);
    }))

    other = CatchAsync((async (req: Request, res: Response, next: NextFunction) => {
        await this.runInTransaction(this.getMethod(req), req, res);
    }))

    async decodeSession(req: Request) {
        const token = req.headers.authorization;

        return null;
    }

    async runInTransaction(method: any, req: Request, res: Response) {
        
        const t = await sequelize.transaction();
        this.transaction = t;

        const session = await this.decodeSession(req);
        if (session == null) {
            this.sendErrorResponse(res, 401, 'unauthorized!');
            return;
        }

        const ctrl: BaseController | null = this.getController(req);
        if (method == null || ctrl == null) {
            this.sendErrorResponse(res, 404, 'resource not found!');
            return;
        }

        if (!ctrl.publicMethods.includes(method)) {
            this.sendErrorResponse(res, 404, 'resource not found!');
            return;
        }

        try {
            ctrl.session = session;
            let resp = await (ctrl as any)[method]();
            await t.commit();

            this.sendSuccessResponse(res, resp);

        } catch (error) {

            await t.rollback();
            console.log(error);

            this.sendErrorResponse(res, error.code || 500, error.message);
        }
    }

    sendSuccessResponse(res: Response, data: any) {
        this.transaction = undefined;
        res.status(200).json({
            status: 'Ok',
            message: 'Sucsess',
            data: data
        });
    }

    sendErrorResponse(res: Response, code: number, msg: any) {
        this.transaction = undefined;
        res.status(code).json({
            status: 'Error',
            message: msg,
            data: null
        });
    }
}
