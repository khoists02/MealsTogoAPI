/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import * as MealsController from '../controllers/meals.controller';
import * as AuthController from '../controllers/auth.controller';

const router = express.Router();

router.route('/top-five-meals')
  .get(AuthController.authProtected, MealsController.topFiveRateForMeals, MealsController.getMeals);

router.route('/:id')
  .put(AuthController.authProtected, MealsController.updateMeal)
  .get(AuthController.authProtected, MealsController.getMeal)
  .delete(AuthController.authProtected, MealsController.deleteMeal);

router.route('/')
  .get(AuthController.authProtected, MealsController.getMeals)
  .post(AuthController.authProtected, MealsController.createMeal);

export default router;
