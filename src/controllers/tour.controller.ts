/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { HTTPS_CODE, HTTPS_STATUS } from '../constants';
import { IError } from '../interfaces/http-error.interface';
import { ITourModel } from '../interfaces/tours.interface';
import { ToursModel } from '../models/tours.model';

export const getTour = async (req: Request, res: Response) => {
  try {
    const tour = await ToursModel.findOne({ _id: req.params.id });
    res.status(HTTPS_CODE.NO_CONTENT)
      .json({
        status: HTTPS_STATUS.SUCCESS,
        data: {
          tour,
        },
      });
  } catch (error: IError | unknown | any) {
    res.status(HTTPS_CODE.NOT_FOUND)
      .json({
        status: HTTPS_STATUS.GET_ERROR,
        errors: error,
        message: error?.message,
      });
  }
};

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await ToursModel.find();
    res.status(HTTPS_CODE.NO_CONTENT)
      .json({
        status: HTTPS_STATUS.SUCCESS,
        data: {
          tours: tours.map((tour: ITourModel) => {
            return {
              name: tour.name,
              price: tour.price,
            };
          }),
        },
      });
  } catch (error: IError | unknown | any) {
    res.status(HTTPS_CODE.SERVER_ERROR)
      .json({
        status: HTTPS_STATUS.GET_ERROR,
        errors: error?.errors,
        message: error?.message,
      });
  }
};

export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour: ITourModel = await ToursModel.create(req.body);
    res.status(HTTPS_CODE.CREATE_SUCCESS).json({
      status: HTTPS_STATUS.SUCCESS,
      data: {
        tour: newTour,
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

export const updateTour = async (req: Request, res: Response) => {
  try {
    const updateTourData = await ToursModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(HTTPS_CODE.NO_CONTENT).json({
      status: HTTPS_STATUS.SUCCESS,
      data: {
        tour: updateTourData,
      },
    });
  } catch (error: IError | unknown | any) {
    res.status(HTTPS_CODE.NOT_FOUND).json({
      status: HTTPS_STATUS.UPDATE_ERROR,
      errors: error?.errors,
      message: error?.message,
    });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    await ToursModel.findByIdAndDelete(req.params.id);
    res.status(HTTPS_CODE.NO_CONTENT).json({
      status: HTTPS_STATUS.SUCCESS,
    });
  } catch (error: IError | unknown | any) {
    res.status(HTTPS_CODE.NOT_FOUND).json({
      status: HTTPS_STATUS.DELETE_ERROR,
      errors: error?.errors,
      message: error?.message,
    });
  }
};