/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import * as MealsController from "../controllers/meals.controller";

const router = express.Router();

router.route("/top-five-meals").get(MealsController.topFiveRateForMeals, MealsController.getMeals);

router.route("/:id").put(MealsController.updateMeal).get(MealsController.getMeal).delete(MealsController.deleteMeal);

router.route("/").get(MealsController.getMeals).post(MealsController.createMeal);

export default router;
