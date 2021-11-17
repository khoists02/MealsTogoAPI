import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { APP_ENDPOINT } from './constants';

import tourRouter from './routes/tour.router';
import userRouter from './routes/user.router';
import mealRouter from './routes/meal.router';

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req: Request, res: Response, next) => {
  next();
});

app.use((req: Request, res: Response, next) => {
  next();
});

// 3) ROUTES
app.use(APP_ENDPOINT.TOURS, tourRouter);
app.use(APP_ENDPOINT.USER, userRouter);
app.use(APP_ENDPOINT.MEAL, mealRouter);

export default app;
