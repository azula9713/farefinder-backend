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

    // return resp;
  } catch (error) {
    logger.error(error);
  }
};

export const restructreSearchResults = (data: any) => {
  const flights: any[] = [];
  let allDifferent = false;

  try {
    data.forEach((agent: any) => {
      if (agent?.proposals) {
        agent.proposals.forEach((proposal: any) => {
          proposal?.segment?.forEach((segment: any, segIn: number) => {
            segment.flight.forEach((flight: any, flightIn: number) => {
              if (
                flights.find(
                  (x) =>
                    x.segment[segIn]?.flight[flightIn]?.number === flight.number &&
                    x.segment[segIn]?.flight[flightIn]?.local_arrival_timestamp === flight.local_arrival_timestamp,
                ) === undefined
              ) {
                allDifferent = true;
              } else {
                allDifferent = false;
              }
            });
          });

          if (allDifferent && flights.find((x) => x.sign === proposal.sign) === undefined) {
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
