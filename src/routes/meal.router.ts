/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import * as MealsController from '../controllers/meals.controller';

const router = express.Router();

// router
//   .route('/:id')
//   .put(TourController.updateTour)
//   .delete(TourController.deleteTour)
//   .get(TourController.getTour);

router
  .route('/')
  .post(MealsController.createMeal);

export default router;
