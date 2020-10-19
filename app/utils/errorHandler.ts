import AppError from "./appError";
import { NextFunction, Request, Response } from "express";

class errorHandler {
  main(err: any, req: Request, res: Response, next: NextFunction){
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
      this.sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === "production") {
      let error = { ...err };
      error.message = err.message;
      switch (error.name) {
        case "CastError":
          error = this.handleCastErrorDB(error);
          break;
        case "ValidationError":
          error = this.handleValidationErrorDB(error);
          break;
        case "JsonWebTokenError":
          error = this.handleJWTError();
          break;
        case "TokenExpiredError":
          error = this.handleJWTExpiredError();
          break;
      }
      if (error.code === 11000) error = this.handleDuplicateFieldsDB(error);
      this.sendErrorProd(error, req, res);
    }
  };

  handleCastErrorDB(err: any) {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
  }

  handleDuplicateFieldsDB(err: any) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  }

  handleValidationErrorDB(err: any) {
    const errors = Object.values(err.errors).map((el: any) => el.message);

    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
  }

  handleJWTError() {
    new AppError("Invalid token. Please log in again!", 401);
  }

  handleJWTExpiredError() {
    new AppError("Your token has expired! Please log in again.", 401);
  }

  sendErrorDev = (err: any, req: Request, res: Response) => {
    // API Error
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };

  sendErrorProd = (err: any, req: Request, res: Response) => {
    if (req.originalUrl.startsWith("/api")) {
      // Operational, trusted error: send message to client
      if (err.isOperational) {
        return res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  };
}

export default new errorHandler().main;
