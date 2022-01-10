import { Request, Response } from 'express';
import config from 'config';

import { CreateSearchIDInput, GetSearchResultsInput } from '../schemas/flightSearch.schema';
import generateMd5Key from '../utils/generateMd5';
import { createNewFlightId, fetchSearchResults } from '../services/flight.service';
import logger from '../utils/logger';

const token = config.get<string>('token');
const marker = config.get<number>('marker');
const language = config.get<string>('language');
const host = config.get<string>('host');

export const searchId = async (req: Request<{}, {}, CreateSearchIDInput['body']>, res: Response) => {
  const body = req.body;
  const { flight_type } = req.body;
  let stringSignarutre = '';

  if (flight_type === 0) {
    stringSignarutre =
      token +
      ':' +
      host +
      ':' +
      language +
      ':' +
      marker.toString() +
      ':' +
      body.passengers.adult.toString() +
      ':' +
      body.passengers.children.toString() +
      ':' +
      '0' +
      ':' +
      body.segments[0].date +
      ':' +
      body.segments[0].destination +
      ':' +
      body.segments[0].origin +
      ':' +
      body.trip_class +
      ':' +
      body.user_ip;
  } else {
    res.status(400).send({
      message: 'flight_type must be 0',
    });
  }

  const generatedmd5 = generateMd5Key(stringSignarutre);
  const searchObject = {
    signature: generatedmd5,
    marker: marker.toString(),
    host: host,
    user_ip: body.user_ip,
    locale: language,
    trip_class: body.trip_class,
    passengers: {
      adult: body.passengers.adult.toString(),
      children: body.passengers.children.toString(),
      infant: '0',
    },
    segments: [
      {
        origin: body.segments[0].origin,
        destination: body.segments[0].destination,
        date: body.segments[0].date,
      },
    ],
  };

  try {
    const reply = await createNewFlightId(searchObject);
    if (reply?.status === 200) {
      res.send(reply.data);
    } else {
      res.status(500).json({ error: reply.data });
    }
  } catch (er) {
    logger.error(er);
  }
};

export const searchResults = async (req: Request<GetSearchResultsInput['params']>, res: Response) => {
  const { searchId } = req.params;

  try {
    const reply = await fetchSearchResults(searchId);
    if (reply?.status === 200) {
      res.send(reply.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (er) {
    logger.error(er);
  }
};
