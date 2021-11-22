import express from 'express';
import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.route('/').get(UserController.getAllUser).post(UserController.createUser);

router.route('/:id').get(UserController.getUser).patch(UserController.updateUser).delete(UserController.deleteUser);

export default router;
