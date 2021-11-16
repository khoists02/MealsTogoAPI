import express from "express";
import * as TourController from "../controllers/tour.controller";

const router = express.Router();

router.param('id', TourController.checkID);

router
  .route('/')
  .get(TourController.getAllTours)
  .post(TourController.checkBody, TourController.createTour);

router
  .route('/:id')
  .get(TourController.getTour)
  .patch(TourController.updateTour)
  .delete(TourController.deleteTour);

export default router;
