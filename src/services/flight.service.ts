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

export const fetchAgencyData = async (searchId: string, termUrl: string) => {
  try {
    const resp = await axios.get(`https://api.travelpayouts.com/v1/flight_searches/${searchId}/clicks/${termUrl}.json`);

    return resp.data;
  } catch (error) {
    logger.error(error);
  }
};

export const fetchSearchResults = async (searchId: string) => {
  try {
    const resp = await axios.get('https://api.travelpayouts.com/v1/flight_search_results', {
      params: {
        uuid: searchId,
      },
      headers: { 'Content-Type': 'application/json' },
    });

    if (resp.status === 200) {
      const flights = restructreSearchResults(resp.data);

      return flights;
    } else {
      return resp;
    }
  } catch (error) {
    logger.error(error);
  }
};

export const restructreSearchResults = (data: any) => {
  const flights: any[] = [];

  try {
    data.forEach((agent: any) => {
      if (agent?.proposals) {
        agent.proposals.forEach((proposal: any) => {
          if (flights.find((f) => f.sign === proposal.sign) === undefined) {
            flights.push(proposal);
          }
        });
      }
    });

    return {
      flights: flights,
      agents: data,
    };
  } catch (error) {
    logger.error(error);
  }
};
