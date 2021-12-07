/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import * as TourController from '../controllers/tour.controller';
import * as AuthController from '../controllers/auth.controller';

const router = express.Router();

router.route('/:id')
  .put(
    AuthController.authProtected,
    AuthController.checkPermission(['admin']),
    TourController.updateTour,
  )
  .delete(
    AuthController.authProtected,
    AuthController.checkPermission(['admin', 'user']),
    TourController.deleteTour,
  )
  .get(
    AuthController.authProtected,
    AuthController.checkPermission(['admin', 'user']),
    TourController.getTour,
  );

router.route('/')
  .get(
    AuthController.authProtected,
    AuthController.checkPermission(['admin', 'user']),
    TourController.getAllTours,
  )
  .post(
    AuthController.authProtected,
    AuthController.checkPermission(['admin']),
    TourController.createTour,
  );

export default router;
