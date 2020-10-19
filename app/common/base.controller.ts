import { CatchAsync } from "../utils/catchAsync";
// import AppError from "../utils/appError";
// import { Model } from "sequelize";
import { Request } from "express";


export class BaseController {
    
    model?: any | null;
    context?: Request;
    publicMethods: any;

    constructor() {
        this.publicMethods = {};
    }

    async list() {
        console.log('list -- base controller ...!');
        const records = await this.model.findAll({
            // attributes: {
            //     exclude: ["password"]
            // }
        });
        return {'data': records, 'total_records': 100}
    }

    async single() {
        console.log('single -- base controller ...!');

    }

    async create() {
        console.log('create -- base controller ...!');

    }

    async update() {
        console.log('update -- base controller ...!');

    }

    async delete() {
        console.log('delete -- base controller ...!');

    }   

    // async createOne(req: Request, res: Response, next: NextFunction) {
    //     const doc = await this.Model.create(req.body);

    //     res.status(201).json({
    //         status: "success",
    //         data: {
    //             data: doc,
    //         },
    //     });
    // }

    // createOne = catchAsync(
    //   async (req: Request, res: Response, next: NextFunction) => {
    //     const doc = await this.Model.create(req.body);

    //     res.status(201).json({
    //       status: "success",
    //       data: {
    //         data: doc,
    //       },
    //     });
    //   }
    // );

    // updateOne = catchAsync(
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         const doc = await this.Model.update(req.body, {
    //             where: {
    //                 [this.Model.primaryKey]: req.body.id
    //             },
    //         });

    //         if (!doc) {
    //             return next(new AppError("No document found with that ID", 404));
    //         }

    //         res.status(200).json({
    //             status: "success",
    //             data: {
    //                 data: doc,
    //             },
    //         });
    //     }
    // );
    // getOne = catchAsync(
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         const doc = await this.Model.findByPk(req.body.id);

    //         if (!doc) {
    //             return next(new AppError("No document found with that ID", 404));
    //         }

    //         res.status(200).json({
    //             status: "success",
    //             data: {
    //                 data: doc,
    //             },
    //         });
    //     }
    // );
    // getAll = catchAsync(
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         const docs = await this.Model.findAll({});

    //         if (!docs) {
    //             return next(new AppError("No document found with that ID", 404));
    //         }

    //         res.status(200).json({
    //             status: "success",
    //             data: {
    //                 data: docs,
    //             },
    //         });
    //     }
    // );
    // deleteOne = catchAsync(
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         await this.Model.destroy(req.body.id);

    //         res.status(204).json({
    //             status: "deleted",
    //             data: null,
    //         });
    //     }
    // );
}