/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '../utils/logger';

export const restructreSearchResults = (data: any) => {
  const flights: any[] = [];
  // const agKeys = getAllAgents(data);

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
    console.log('flights', flights);

    return {
      // flights: removeInvalidFlights(flights, agKeys),
      flights,
      agents: data,
    };
  } catch (error) {
    logger.error(error);
  }
};

// const getAllAgents = (agents: any[]) => {
//   const allAgents: any[] = [];
//   agents.forEach((agent: any) => {
//     if (agent.proposals) {
//       const agentKey = Object.keys(agent.gates_info)[0];

//       //if agentKey is not in allAgents array, add it

//       if (!allAgents.includes(agentKey)) {
//         allAgents.push(agentKey);
//       }
//     }
//   });
//   return allAgents;
// };

// const removeInvalidFlights = (flights: any[], agents: any[]) => {
//   const validFlights: any[] = [];

//   flights.forEach((flight: any) => {
//     const flightAk = Object.keys(flight.terms)[0];

//     if (agents.includes(flightAk)) {
//       validFlights.push(flight);
//     }
//   });

//   return validFlights;
// };
