/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { HTTPS_CODE, HTTPS_STATUS } from '../constants';
import { IError } from '../interfaces/http-error.interface';
import { IMeal } from '../interfaces/meal.interface';
import { MealsModel } from '../models/meal.model';

export const createMeal = async (req: Request, res: Response) => {
  try {
    const newMeal: IMeal = await MealsModel.create(req.body);
    res.status(HTTPS_CODE.CREATE_SUCCESS).json({
      status: HTTPS_STATUS.SUCCESS,
      data: {
        tour: newMeal,
      },
    });
  } catch (error: IError | unknown | any) {
    res.status(HTTPS_CODE.SERVER_ERROR).json({
      status: HTTPS_STATUS.CREATE_ERROR,
      errors: error?.errors,
      message: error?.message,
    });
  }
};