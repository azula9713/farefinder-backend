/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';
import {
  CreatePopularLocationInput,
  UpdatePopularLocationInput,
  DeletePopularLocationInput,
  GetPopularLocationInput,
} from '../schemas/popularLocation.schema';
import {
  createPopularLocation,
  findAndUpdatePopularLocation,
  findAndDeletePopularLocation,
  findAllPopularLocations,
  findPopularLocation,
} from '../services/popularLocation.service';
import logger from '../utils/logger';

const createPopularLocationHandler = async (req: Request<{}, {}, CreatePopularLocationInput['body']>, res: Response) => {
  const userId = res.locals.user_id;

  const body = req.body;

  try {
    //add user role verification
    const popLocation = await createPopularLocation({ ...body, createdBy: userId, updatedBy: userId });
    return res.send(popLocation);
  } catch (err) {
    logger.error('Error creating location', err);
    return res.status(500).send(err);
  }
};

const getPopularLocationHandler = async (req: Request<GetPopularLocationInput['params']>, res: Response) => {
  const locationId = req.params.locationId;
  const popLocation = await findPopularLocation({ locationId });

  if (!popLocation) {
    return res.status(404).send({ message: 'Location not found' });
  }

  return res.send(popLocation);
};

const getAllPopularLocationsHandler = async (req: Request, res: Response) => {
  const popularLocations = await findAllPopularLocations();

  if (!popularLocations) {
    return res.status(404).send({ message: 'Locations not found' });
  }

  return res.send(popularLocations);
};

const updatePopularLocationHandler = async (req: Request<UpdatePopularLocationInput['params']>, res: Response) => {
  const userId = res.locals.user_id;

  const locationId = req.params.locationId;
  const update = req.body;

  const popLocation = await findPopularLocation({ locationId });

  if (!popLocation) {
    return res.status(404).send({ message: 'Location not found' });
  }

  try {
    //add user role verification
    const updatedPopLocation = await findAndUpdatePopularLocation({ locationId }, { ...update, updatedBy: userId }, { new: true });
    return res.send(updatedPopLocation);
  } catch (err) {
    logger.error('Error updating location', err);
    return res.status(500).send(err);
  }
};

const deletePopularLocationHandler = async (req: Request<DeletePopularLocationInput['params']>, res: Response) => {
  //add user role verification
  const locationId = req.params.locationId;

  const popLocation = await findPopularLocation({ locationId });

  if (!popLocation) {
    return res.status(404).send({ message: 'Location not found' });
  }

  try {
    await findAndDeletePopularLocation({ locationId });
    return res.sendStatus(204);
  } catch (err) {
    logger.error('Error deleting location', err);
    return res.status(500).send(err);
  }
};

export {
  createPopularLocationHandler,
  getPopularLocationHandler,
  getAllPopularLocationsHandler,
  updatePopularLocationHandler,
  deletePopularLocationHandler,
};
