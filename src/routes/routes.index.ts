import { Express } from 'express';

import flightRoutes from './flight.routes';

const routes = (app: Express): void => {
  app.use('/api/v1/flight', flightRoutes);
};

export default routes;
