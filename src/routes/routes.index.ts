import { Express } from 'express';

import flightRoutes from './flight.routes';
import sessionRoutes from './session.routes';
import userRoutes from './user.routes';
import popularLocationRoutes from './popularLocation.routes';
import hotelScriptRoutes from './hotelScript.routes';

const routes = (app: Express): void => {
  app.use('/api/v1/flight', flightRoutes);
  app.use('/api/v1/auth', sessionRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/popular-locations', popularLocationRoutes);
  app.use('/api/v1/hotel-scripts', hotelScriptRoutes);
};

export default routes;
