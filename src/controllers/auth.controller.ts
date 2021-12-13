/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { HTTPS_CODE, HTTPS_STATUS } from "../constants";
import { UsersModel } from "../models/users.model";
// tslint:disable-next-line: import-name
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
// tslint:disable-next-line: import-name
import jwt from "jsonwebtoken";
import { UsersRolesModel } from "../models/users_roles_model";
import { RolesModel } from "../models/roles.model";
dotenv.config({ path: "./config.env" });

export const signup = catchAsync(async (req: Request, res: Response) => {
  const newUser: any = await UsersModel.create(req.body);

  const userRole = await RolesModel.findOne({ name: "user" });
  const usersRoles = new UsersRolesModel({ userId: newUser._id, roleId: userRole?._id });
  usersRoles.save();
  res.status(HTTPS_CODE.CREATE_SUCCESS).json({
    status: HTTPS_STATUS.SUCCESS,
    data: {
      meal: newUser,
    },
  });
});

const generalJWToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRETS || "", { expiresIn: process.env.JWT_EXPIRES_IN || "90d" });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next(new AppError("Please provide the email and password", 400));
    }

    const user: any = await UsersModel.findOne({ email }).populate("roles", "name").select("+password");
    const correct = await user.correctPassword(password, user?.password);

    if (!user || !correct) {
      res.status(400).json({
        status: 401,
        message: "Wrong email or password",
      });
    }
    const token = generalJWToken(user._id);

    res.status(200).json({
      token,
      statusCode: 200,
      data: {
        user: {
          username: user.name,
          id: user._id,
          email: user.email,
          roles: user.roles.map((x: any) => x.name),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something was wrong",
    });
  }
};

export const logout = (req: any, res: Response) => {
  req.user = null;
  req.headers.authorization = null;
  res.status(200).json({
    message: "success",
  });
};

/**
 * Middleware
 * @param permissions
 * @returns
 */

export const checkPermission = (permissions: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const roles = req.user?.roles || [];
    if (roles.length === 0 || (permissions.length > 0 && !permissions.some((item: string) => roles.includes(item)))) {
      return next(new AppError("You do not have a permission access this API", 403));
    }
    next();
  };
};

export const authenticatedRouter = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    let token = "";
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }
    if (!token) {
      next(new AppError("You are not logged in, Please login to get access..", 401));
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRETS || "");

    const currentUser = await UsersModel.findById(decoded.id).populate("roles", "name");
    if (!currentUser) {
      next(new AppError("Invalid the token", 401));
      return;
    }
    const userResponse = {
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      roles: currentUser.roles.map((x: any) => x.name),
    };
    req.user = userResponse;
    next();
  } catch (error: any) {
    next(new AppError("Something was wrong", 500));
  }
};
