import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { APP_ENDPOINT } from "./constants";

import tourRouter from "./routes/tour.router";
// import userRouter from './routes/user.router';
import mealRouter from "./routes/meal.router";
import authRouter from "./routes/auth.router";
import userRouter from "./routes/user.router";
import appError from "./utils/appError";
import { ErrorController } from "./controllers/error.controller";

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES
app.use(APP_ENDPOINT.TOURS, tourRouter);
// app.use(APP_ENDPOINT.USER, userRouter);
app.use(APP_ENDPOINT.MEAL, mealRouter);
app.use(APP_ENDPOINT.AUTH, authRouter);
app.use(APP_ENDPOINT.USER, userRouter);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new appError(`Can not find ${req.originalUrl} on this application !!!`, 400);
  err.status = "fail";
  next(err);
});

/**
 * Error middleware function here !!!
 */
app.use(ErrorController);

export default app;
