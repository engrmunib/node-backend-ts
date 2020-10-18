import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import { Model } from "sequelize";
import { NextFunction, Request, Response } from "express";

// unstable controller

class baseController {
  constructor(private Model: any) {}
  createOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const doc = await this.Model.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    }
  );
  updateOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const doc = await this.Model.update(req.body, {
        where: { [this.Model.primaryKey]: req.body.id },
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
    }
  );
  getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const doc = await this.Model.findByPk(req.body.id);

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    }
  );
  getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const docs = await this.Model.findAll({});

      if (!docs) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: docs,
        },
      });
    }
  );
  deleteOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await this.Model.destroy(req.body.id);

      res.status(204).json({
        status: "deleted",
        data: null,
      });
    }
  );
}

export default baseController;
