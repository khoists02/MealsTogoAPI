/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
// tslint:disable-next-line: import-name
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err: any) => {
  const values = Object.values(err.keyValue);
  const message = `Duplicate  ${values[0]}`;
  return new AppError(message, 500);
};

const handleValidationErrorDB = (errors: any) => {
  const keys = Object.keys(errors);
  let message = errors[keys[0]].name;
  keys.forEach((k: string) => {
    message += `${errors[k].message} ${keys.length > 1 ? "," : ""}`;
  });
  return new AppError(message, 400);
};

// tslint:disable-next-line: variable-name
export const ErrorController = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    if (error.errors) {
      error = handleValidationErrorDB(error.errors);
    }
    errorSendDev(res, error);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    errorSendClient(res, error);
  }
  next(err);
};
