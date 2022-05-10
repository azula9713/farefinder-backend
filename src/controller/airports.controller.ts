import { Request, Response } from 'express';
import { fetchAllAirports } from '../services/airports.service';

import logger from '../utils/logger';

export const airportsData = async (_req: Request, res: Response) => {
  try {
    const airports = await fetchAllAirports();

    res.send(airports);
  } catch (er) {
    logger.error(er);
  }
};
