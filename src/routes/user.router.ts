/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import * as AuthController from "../controllers/auth.controller";
import * as UserController from "../controllers/user.controller";
const router = express.Router();

router.put("/update-roles/:id", AuthController.authenticatedRouter, UserController.updateRoleForUser);

export default router;
