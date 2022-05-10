import { Request, Response } from 'express';
import { fetchAllCities } from '../services/cities.service';

import logger from '../utils/logger';

export const citiesData = async (_req: Request, res: Response) => {
  try {
    const airports = await fetchAllCities();

    res.send(airports);
  } catch (er) {
    logger.error(er);
  }
};
