/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import * as MealsController from "../controllers/meals.controller";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/top-five-meals")
  .get(
    AuthController.authenticatedRouter,
    AuthController.checkPermission(["user", "admin"]),
    MealsController.topFiveRateForMeals,
    MealsController.getMeals,
  );

router
  .route("/:id")
  .put(
    AuthController.authenticatedRouter,
    AuthController.checkPermission(["user", "admin"]),
    MealsController.updateMeal,
  )
  .get(AuthController.authenticatedRouter, AuthController.checkPermission(["user", "admin"]), MealsController.getMeal)
  .delete(
    AuthController.authenticatedRouter,
    AuthController.checkPermission(["user", "admin"]),
    MealsController.deleteMeal,
  );

router
  .route("/")
  .get(AuthController.authenticatedRouter, AuthController.checkPermission(["user", "admin"]), MealsController.getMeals)
  .post(
    AuthController.authenticatedRouter,
    AuthController.checkPermission(["user", "admin"]),
    MealsController.createMeal,
  );

export default router;
