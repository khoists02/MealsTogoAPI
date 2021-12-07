/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

export default router;
