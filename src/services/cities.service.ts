import axios from 'axios';
import logger from '../utils/logger';

export const fetchAllCities = async () => {
  try {
    const resp = await axios.get(`http://api.travelpayouts.com/data/cities.json`);

    //remove all airports with flightable = false
    // const airports = resp?.data?.filter((airport: any) => airport.flightable);

    return resp.data;
  } catch (error) {
    logger.error(error);
  }
};
