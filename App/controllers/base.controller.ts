import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import { Model } from "sequelize";
import { NextFunction, Request, Response } from "express";

class baseController {
  createOne(Model: any) {
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await Model.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    });
  }

  updateOne(Model: any) {
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await Model.update(req.body, {
        where: { user_id: req.body.id },
      });

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    });
  }
  getOne(Model: any) {
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = Model.findOne(req.params.id);

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    });
  }
  deleteOne(Model: any) {
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      await Model.destroy(req.body.id);

      res.status(204).json({
        status: "deleted",
        data: null,
      });
    });
  }
}

export default baseController;
