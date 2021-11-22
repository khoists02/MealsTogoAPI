/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { HTTPS_CODE, HTTPS_STATUS } from "../constants";
import { IMeal } from "../interfaces/meal.interface";
import { MealsModel } from "../models/meal.model";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { buildQueryString, selectFields, sortBy } from "../utils/query-string";

/**
 * GET TOP FIVE API /
 * GET: 127.0.0.1:3000/api/v1/meals/top-five-meals
 */
export const topFiveRateForMeals = (req: Request, res: Response, next: NextFunction) => {
  req.query.limit = "5";
  req.query.sort = "-rate";
  next();
};

/**
 * FILTER MEALS API /
 * GET: 127.0.0.1:3000/api/v1/meals
 */
export const getMeals = catchAsync(async (req: Request, res: Response) => {
  const sort = sortBy(req, "name");
  const page: number = Number(req.query.page) * 1 || 1;
  const limit: number = Number(req.query.limit) * 1 || 100;
  const skip: number = (page - 1) * limit;
  const meals = await MealsModel.find(JSON.parse(buildQueryString(req, ["name", "description"])))
    .sort(sort)
    .select(selectFields(req))
    .skip(skip)
    .limit(limit);

  res.status(HTTPS_CODE.NO_CONTENT).json({
    status: HTTPS_STATUS.SUCCESS,
    result: meals.length,
    data: {
      meals,
    },
  });
});

/**
 * UPDATE MEALS API /
 * PUT: 127.0.0.1:3000/api/v1/meals/:id
 */
export const updateMeal = catchAsync(async (req: Request, res: Response) => {
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
});

/**
 * CREATE NEW MEAL API /
 * POST: 127.0.0.1:3000/api/v1/meals
 */
export const createMeal = catchAsync(async (req: Request, res: Response) => {
  const newMeal: IMeal = await MealsModel.create(req.body);
  res.status(HTTPS_CODE.CREATE_SUCCESS).json({
    status: HTTPS_STATUS.SUCCESS,
    data: {
      meal: newMeal,
    },
  });
});

/**
 * GET ONE MEAL API /
 * GET: 127.0.0.1:3000/api/v1/meals/:id
 */
export const getMeal = catchAsync(
  async (req: Request<{ id: any }, any, { id: any }>, res: Response, next: NextFunction) => {
    const meal = await MealsModel.findOne({ _id: req.params.id });

    if (!meal) {
      next(new AppError(`No meal with ID ${req.params.id}`, 404));
    }

    res.status(HTTPS_CODE.NO_CONTENT).json({
      status: HTTPS_STATUS.SUCCESS,
      data: {
        meal,
      },
    });
  },
);

/**
 * DELETE MEAL API /
 * DELETE: 127.0.0.1:3000/api/v1/meals/:id
 */
export const deleteMeal = catchAsync(
  async (req: Request<{ id: any }, any, { id: any }>, res: Response, next: NextFunction) => {
    const meal = await MealsModel.findOneAndDelete({ _id: req.params.id });

    if (!meal) {
      next(new AppError(`No meal with ID ${req.params.id}`, 404));
    }

    res.status(HTTPS_CODE.NO_CONTENT).json({
      status: HTTPS_STATUS.SUCCESS,
    });
  },
);
