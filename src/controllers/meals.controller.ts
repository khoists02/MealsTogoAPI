/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { HTTPS_CODE, HTTPS_STATUS } from '../constants';
import { IError } from '../interfaces/http-error.interface';
import { IMeal } from '../interfaces/meal.interface';
import { MealsModel } from '../models/meal.model';
import { buildQueryString, selectFields, sortBy } from '../utils/query-string';

export const getMeals = async (req: Request, res: Response) => {
  try {
    const sort = sortBy(req, 'name');
    const page: number = Number(req.query.page) * 1 || 1;
    const limit: number = Number(req.query.limit) * 1 || 100;
    const skip: number = (page - 1) * limit;
    const meals = await MealsModel
      .find(JSON.parse(buildQueryString(req, ['name', 'description'])))
      .sort(sort)
      .select(selectFields(req))
      .skip(skip)
      .limit(limit);

    res.status(HTTPS_CODE.NO_CONTENT).json({
      status: HTTPS_STATUS.SUCCESS,
      data: {
        meals,
      },
    });
  } catch (error: IError | unknown | any) {
    res.status(HTTPS_CODE.SERVER_ERROR).json({
      status: HTTPS_STATUS.SUCCESS,
      // tslint:disable-next-line: object-shorthand-properties-first
      error,
      message: error?.message,
    });
  }
};

export const updateMeal = async (req: Request, res: Response) => {
  try {
    const updateMealData = await MealsModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(HTTPS_CODE.CREATE_SUCCESS).json({
      status: HTTPS_STATUS.SUCCESS,
      data: {
        updateMeal: updateMealData,
      },
    });
  } catch (error: IError | unknown | any) {
    res.status(HTTPS_CODE.NOT_FOUND).json({
      status: HTTPS_STATUS.UPDATE_ERROR,
      // tslint:disable-next-line: object-shorthand-properties-first
      error,
      message: error?.message,
    });
  }
};

export const createMeal = async (req: Request, res: Response) => {
  try {
    const newMeal: IMeal = await MealsModel.create(req.body);
    res.status(HTTPS_CODE.CREATE_SUCCESS).json({
      status: HTTPS_STATUS.SUCCESS,
      data: {
        meal: newMeal,
      },
    });
  } catch (error: IError | unknown | any) {
    res.status(HTTPS_CODE.SERVER_ERROR).json({
      status: HTTPS_STATUS.CREATE_ERROR,
      // tslint:disable-next-line: object-shorthand-properties-first
      error,
      message: error?.message,
    });
  }
};
