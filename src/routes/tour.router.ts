/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import * as TourController from '../controllers/tour.controller';

const router = express.Router();

router
  .route('/')
  .post(TourController.createTour);

export default router;
