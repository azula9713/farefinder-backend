import axios from 'axios';

import logger from '../utils/logger';

export const createNewFlightId = async (searchObject: object) => {
  try {
    const resp = await axios.post('https://api.travelpayouts.com/v1/flight_search', JSON.stringify(searchObject), {
      headers: { 'Content-Type': 'application/json' },
    });

    return resp;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchSearchResults = async (searchId: string) => {
  logger.info(`searchId: ${searchId}`);
  try {
    const resp = await axios.get('https://api.travelpayouts.com/v1/flight_search_results', {
      params: {
        uuid: searchId,
      },
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log('resp', resp);
    return resp;
  } catch (error) {
    logger.error(error);
  }
};
