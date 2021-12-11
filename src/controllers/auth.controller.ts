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
import { Types } from "mongoose";
import { Role } from "../interfaces/roles.interface";
dotenv.config({ path: "./config.env" });

/**
 * Controllers
 */

// export const authenticatedUser =
//   catchAsync(async (req: any, res: Response) => {
//     const { authorization } = req.headers;
//     let token = '';
//     if (authorization && authorization.startsWith('Bearer')) {
//       token = authorization.split(' ')[1];
//     }
//     if (!token) {
//       res.status(401).json({
//         message: 'You are not logged in, Please login to get access..',
//       });
//     }
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRETS || '');

//     const currentUser = await UsersModel.findById(decoded.id);
//     if (!currentUser) {
//       res.status(401).json({
//         message: 'Invalid token .',
//       });
//       return;
//     }

//     const usersRoles = await UsersRolesModel.find({ userId: currentUser?._id });
//     let roleNames: string[] = [];
//     if (usersRoles && usersRoles.length > 0) {
//     // tslint:disable-next-line: ter-arrow-parens
//       const roleIds = usersRoles.map((x) => new Types.ObjectId(x.roleId));
//       const roles = await RolesModel.find({
//         _id: { $in: roleIds },
//       });
//       roleNames = roles.map((role: Role) => role.name) as string[];
//     }

//     const userResponse = {
//       id: currentUser._id,
//       name: currentUser.name,
//       email: currentUser.email,
//       roles: roleNames,
//     };
//     res.status(200).json({
//       type: 'success',
//       data: {
//         user: userResponse,
//       },
//     });
//   });

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

    const user: any = await UsersModel.findOne({ email }).select("+password");
    const correct = await user.correctPassword(password, user?.password);

    if (!user || !correct) {
      res.status(400).json({
        status: 401,
        message: "Wrong email or password",
      });
    }
    const token = generalJWToken(user._id);

    const usersRoles = await UsersRolesModel.find({ userId: user._id });
    let roleNames: string[] = [];
    if (usersRoles && usersRoles.length > 0) {
      // tslint:disable-next-line: ter-arrow-parens
      const roleIds = usersRoles.map((x) => new Types.ObjectId(x.roleId));
      const roles = await RolesModel.find({
        _id: { $in: roleIds },
      });
      roleNames = roles.map((role: Role) => role.name) as string[];
    }

    res.status(200).json({
      token,
      statusCode: 200,
      data: {
        user: {
          username: user.name,
          id: user._id,
          email: user.email,
          roles: roleNames,
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

    const currentUser = await UsersModel.findById(decoded.id);
    if (!currentUser) {
      next(new AppError("Invalid the token", 401));
      return;
    }

    const usersRoles = await UsersRolesModel.find({ userId: currentUser?._id });
    let roleNames: string[] = [];
    if (usersRoles && usersRoles.length > 0) {
      // tslint:disable-next-line: ter-arrow-parens
      const roleIds = usersRoles.map((x) => new Types.ObjectId(x.roleId));
      const roles = await RolesModel.find({
        _id: { $in: roleIds },
      });
      roleNames = roles.map((role: Role) => role.name) as string[];
    }

    const userResponse = {
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      roles: roleNames,
    };
    req.user = userResponse;
    next();
  } catch (error: any) {
    next(new AppError("Something was wrong", 500));
  }
};
