import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const errorSendDev = (res: Response, err: AppError) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const errorSendClient = (res: Response, err: AppError) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong !!!",
    });
  }
};

export const ErrorController = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    errorSendDev(res, err);
  } else if (process.env.NODE_ENV === "production") {
    errorSendClient(res, err);
  }
  next(err);
};
