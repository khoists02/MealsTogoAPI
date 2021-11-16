/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import fs from "fs";
import { data } from "../dev-data/data/tours-simple.data";

// const readFileSrc: any = `${__dirname}/dev-data/data/tours-simple.json`;
// console.log({ __dirname });
// const tourJson = fs.readFileSync(readFileSrc);

const tours = data;

export const checkID = (req: any, res: Response, next: any, val: any) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
}


export const checkBody = (req: any, res: Response, next: any) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

export const getAllTours = (req: Request, res: Response) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

export const getTour = (req: any, res: Response) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((el: any) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

export const createTour = (req: Request, res: Response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err: any) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

export const updateTour = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>"
    }
  });
};

export const deleteTour = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
