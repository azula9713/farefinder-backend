import { object, string, TypeOf } from 'zod';

const popularLocationPayload = {
  body: object({
    locationTitle: string({ required_error: 'Location title is required' }),
    locationImage: string({ required_error: 'Location image is required' }),
    locationDescription: string({ required_error: 'Location description is required' }),
    locationAirportCode: string({ required_error: 'Location airport code is required' }),
    locationHotelCode: string({ required_error: 'Location hotel code is required' }),
    locationCarCode: string({ required_error: 'Location car code is required' }),
  }),
};

const params = {
  params: object({
    locationId: string({ required_error: 'Location id is required' }),
  }),
};

const createPopularLocationSchema = object({
  ...popularLocationPayload,
});

const updatePopularLocationSchema = object({
  ...popularLocationPayload,
  ...params,
});

const deletePopularLocationSchema = object({
  ...params,
});

const getPopularLocationSchema = object({
  ...params,
});

type CreatePopularLocationInput = TypeOf<typeof createPopularLocationSchema>;
type UpdatePopularLocationInput = TypeOf<typeof updatePopularLocationSchema>;
type DeletePopularLocationInput = TypeOf<typeof deletePopularLocationSchema>;
type GetPopularLocationInput = TypeOf<typeof getPopularLocationSchema>;

export {
  createPopularLocationSchema,
  updatePopularLocationSchema,
  deletePopularLocationSchema,
  getPopularLocationSchema,
  CreatePopularLocationInput,
  UpdatePopularLocationInput,
  DeletePopularLocationInput,
  GetPopularLocationInput,
};
