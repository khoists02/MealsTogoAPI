import { Request, Response } from 'express';
import { HTTPS_CODE, HTTPS_STATUS } from '../constants';
import { IUser } from '../interfaces/users.interface';
import { UsersModel } from '../models/users.model';
import { catchAsync } from '../utils/catchAsync';

export const signup = catchAsync(async (req: Request, res: Response) => {
  const newUser: IUser = await UsersModel.create(req.body);
  res.status(HTTPS_CODE.CREATE_SUCCESS).json({
    status: HTTPS_STATUS.SUCCESS,
    data: {
      meal: newUser,
    },
  });
});
