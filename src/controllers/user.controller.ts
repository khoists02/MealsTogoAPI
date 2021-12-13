import { Request, Response } from "express";
import { UsersModel } from "../models/users.model";

export const updateRoleForUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findById(id);

    if (!user) {
      res.status(400).json({
        message: "Not found user !",
      });
      return;
    }
    await user.update({
      roles: req.body,
    });
    res.status(201).json({
      message: "Update roles success !!!",
    });
  } catch (error) {
    res.status(500).json({
      errors: error,
      message: "something was wrong !",
    });
  }
};
