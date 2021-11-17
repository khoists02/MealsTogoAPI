/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import * as MealsController from '../controllers/meals.controller';

const router = express.Router();

router
  .route('/:id')
  .put(MealsController.updateMeal);

router
  .route('/')
  .get(MealsController.getMeals)
  .post(MealsController.createMeal);

export default router;
