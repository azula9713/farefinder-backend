/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';
import {
  CreateHomePageLocationInput,
  UpdateHomePageLocationInput,
  DeleteHomePageLocationInput,
  GetHomePageLocationInput,
} from '../schemas/homepageLocation.schema';
import {
  createHomePageLocation,
  findAndUpdateHomePageLocation,
  findAndDeleteHomePageLocation,
  findAllHomePageLocations,
  findHomePageLocation,
} from '../services/homepageLocation.service';
import logger from '../utils/logger';

const createHomeLocationHandler = async (req: Request<{}, {}, CreateHomePageLocationInput['body']>, res: Response) => {
  const userId = res.locals.user._id;

  const body = req.body;

  try {
    //add user role verification
    const hotelScript = await createHomePageLocation({ ...body, createdBy: userId, updatedBy: userId });
    return res.send(hotelScript);
  } catch (err) {
    logger.error('Error creating lcoation name', err);
    return res.status(500).send(err);
  }
};

const getHomeLocationHandler = async (req: Request<GetHomePageLocationInput['params']>, res: Response) => {
  const locationNameId = req.params.locationNameId;
  const hotelScript = await findHomePageLocation({ locationNameId });

  if (!hotelScript) {
    return res.status(404).send({ message: 'Location name not found' });
  }

  return res.send(hotelScript);
};

const getAllHomeLocationsHandler = async (_req: Request, res: Response) => {
  const hotelScripts = await findAllHomePageLocations();

  if (!hotelScripts) {
    return res.status(404).send({ message: 'Location names not found' });
  }

  return res.send(hotelScripts);
};

const updateHomeLocationHandler = async (req: Request<UpdateHomePageLocationInput['params']>, res: Response) => {
  const userId = res.locals.user_id;

  const locationNameId = req.params.locationNameId;
  const update = req.body;

  const hotelScript = await findHomePageLocation({ locationNameId });

  if (!hotelScript) {
    return res.status(404).send({ message: 'Location name not found' });
  }

  try {
    //add user role verification
    const updatedPopLocation = await findAndUpdateHomePageLocation({ locationNameId }, { ...update, updatedBy: userId }, { new: true });
    return res.send(updatedPopLocation);
  } catch (err) {
    logger.error('Error updating hotel script', err);
    return res.status(500).send(err);
  }
};

const deleteHomeLocationHandler = async (req: Request<DeleteHomePageLocationInput['params']>, res: Response) => {
  //add user role verification
  const locationNameId = req.params.locationNameId;

  const hotelScript = await findHomePageLocation({ locationNameId });

  if (!hotelScript) {
    return res.status(404).send({ message: 'Location name not found' });
  }

  try {
    await findAndDeleteHomePageLocation({ locationNameId });
    return res.sendStatus(204);
  } catch (err) {
    logger.error('Error deleting location name', err);
    return res.status(500).send(err);
  }
};

export {
  createHomeLocationHandler,
  getHomeLocationHandler,
  getAllHomeLocationsHandler,
  updateHomeLocationHandler,
  deleteHomeLocationHandler,
};
