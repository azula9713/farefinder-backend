import { object, string, TypeOf } from 'zod';

const homePageLocationPayload = {
  body: object({
    locationName: string({ required_error: 'Location name is required' }),
  }),
};

const params = {
  params: object({
    locationNameId: string({ required_error: 'Location name id is required' }),
  }),
};

const createHomePageLocationSchema = object({
  ...homePageLocationPayload,
});

const updateHomePageLocationSchema = object({
  ...homePageLocationPayload,
  ...params,
});

const deleteHomePageLocationSchema = object({
  ...params,
});

const getHomePageLocationSchema = object({
  ...params,
});

type CreateHomePageLocationInput = TypeOf<typeof createHomePageLocationSchema>;
type UpdateHomePageLocationInput = TypeOf<typeof updateHomePageLocationSchema>;
type DeleteHomePageLocationInput = TypeOf<typeof deleteHomePageLocationSchema>;
type GetHomePageLocationInput = TypeOf<typeof getHomePageLocationSchema>;

export {
  createHomePageLocationSchema,
  updateHomePageLocationSchema,
  deleteHomePageLocationSchema,
  getHomePageLocationSchema,
  CreateHomePageLocationInput,
  UpdateHomePageLocationInput,
  DeleteHomePageLocationInput,
  GetHomePageLocationInput,
};
