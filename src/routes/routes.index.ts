import { Express } from 'express';

import flightRoutes from './flight.routes';
import sessionRoutes from './session.routes';
import userRoutes from './user.routes';

const routes = (app: Express): void => {
  app.use('/api/v1/flight', flightRoutes);
  app.use('/api/v1/auth', sessionRoutes);
  app.use('/api/v1/user', userRoutes);
};

export default routes;
