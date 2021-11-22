/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import * as TourController from '../controllers/tour.controller';

const router = express.Router();

router.route('/:id').put(TourController.updateTour).delete(TourController.deleteTour).get(TourController.getTour);

router.route('/').get(TourController.getAllTours).post(TourController.createTour);

export default router;
