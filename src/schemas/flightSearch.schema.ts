import { array, number, object, string, TypeOf } from 'zod';

const searchPayload = {
  body: object({
    trip_class: string(),
    user_ip: string(),
    flight_type: number(),
    passengers: object({
      adult: number(),
      children: number(),
      infants: number(),
    }),
    segments: array(
      object({
        origin: string(),
        destination: string(),
        date: string(),
      }),
    ),
  }),
};

const params = {
  params: object({
    searchId: string({ required_error: 'searchId is required' }),
  }),
};

const createSeachIdSchema = object({
  ...searchPayload,
});

const getSearchResultsSchema = object({
  ...params,
});

type CreateSearchIDInput = TypeOf<typeof createSeachIdSchema>;
type GetSearchResultsInput = TypeOf<typeof getSearchResultsSchema>;

export { CreateSearchIDInput, GetSearchResultsInput };
