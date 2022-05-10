/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';
import { CreateHotelScriptInput, UpdateHotelScriptInput, DeleteHotelScriptInput, GetHotelScriptInput } from '../schemas/hotelScript.schema';
import {
  createHotelScript,
  findAndUpdateHotelScript,
  findAndDeleteHotelScript,
  findAllHotelScripts,
  findHotelScript,
} from '../services/hotelScript.service';
import logger from '../utils/logger';

const createHotelScriptHandler = async (req: Request<{}, {}, CreateHotelScriptInput['body']>, res: Response) => {
  const userId = res.locals.user._id;

  const body = req.body;

  try {
    //add user role verification
    const hotelScript = await createHotelScript({ ...body, createdBy: userId, updatedBy: userId });
    return res.send(hotelScript);
  } catch (err) {
    logger.error('Error creating hotel script', err);
    return res.status(500).send(err);
  }
};

const getHotelScriptHandler = async (req: Request<GetHotelScriptInput['params']>, res: Response) => {
  const hotelScriptId = req.params.hotelScriptId;
  const hotelScript = await findHotelScript({ hotelScriptId });

  if (!hotelScript) {
    return res.status(404).send({ message: 'Hotel script not found' });
  }

  return res.send(hotelScript);
};

const getAllHotelScriptsHandler = async (_req: Request, res: Response) => {
  const hotelScripts = await findAllHotelScripts();

  if (!hotelScripts) {
    return res.status(404).send({ message: 'Hotel Scripts not found' });
  }

  return res.send(hotelScripts);
};

const updateHotelScriptsHandler = async (req: Request<UpdateHotelScriptInput['params']>, res: Response) => {
  const userId = res.locals.user_id;

  const hotelScriptId = req.params.hotelScriptId;
  const update = req.body;

  const hotelScript = await findHotelScript({ hotelScriptId });

  if (!hotelScript) {
    return res.status(404).send({ message: 'Hotel script not found' });
  }

  try {
    //add user role verification
    const updatedPopLocation = await findAndUpdateHotelScript({ hotelScriptId }, { ...update, updatedBy: userId }, { new: true });
    return res.send(updatedPopLocation);
  } catch (err) {
    logger.error('Error updating hotel script', err);
    return res.status(500).send(err);
  }
};

const deleteHotelScriptsHandler = async (req: Request<DeleteHotelScriptInput['params']>, res: Response) => {
  //add user role verification
  const hotelScriptId = req.params.hotelScriptId;

  const hotelScript = await findHotelScript({ hotelScriptId });

  if (!hotelScript) {
    return res.status(404).send({ message: 'Hotel script not found' });
  }

  try {
    await findAndDeleteHotelScript({ hotelScriptId });
    return res.sendStatus(204);
  } catch (err) {
    logger.error('Error deleting hotel script', err);
    return res.status(500).send(err);
  }
};

export { createHotelScriptHandler, getHotelScriptHandler, getAllHotelScriptsHandler, updateHotelScriptsHandler, deleteHotelScriptsHandler };
