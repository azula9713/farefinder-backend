import axios from 'axios';
import logger from '../utils/logger';

export const fetchAllAirports = async () => {
  try {
    const resp = await axios.get(`http://api.travelpayouts.com/data/airports.json`);

    //remove all airports with flightable = false
    const airports = resp?.data?.filter((airport: any) => airport.flightable);

    return airports;
  } catch (error) {
    logger.error(error);
  }
};
