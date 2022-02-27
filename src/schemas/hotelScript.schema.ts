import { boolean, object, string, TypeOf } from 'zod';

const hotelScriptPayload = {
  body: object({
    scriptSource: string({ required_error: 'Script source is required' }),
    hotelName: string({ required_error: 'Hotel name is required' }),
    isActive: boolean({ required_error: 'Is active is required' }),
  }),
};

const params = {
  params: object({
    hotelScriptId: string({ required_error: 'Hotel script id is required' }),
  }),
};

const createHotelScriptSchema = object({
  ...hotelScriptPayload,
});

const updateHotelScriptSchema = object({
  ...hotelScriptPayload,
  ...params,
});

const deleteHotelScriptSchema = object({
  ...params,
});

const getHotelScriptSchema = object({
  ...params,
});

type CreateHotelScriptInput = TypeOf<typeof createHotelScriptSchema>;
type UpdateHotelScriptInput = TypeOf<typeof updateHotelScriptSchema>;
type DeleteHotelScriptInput = TypeOf<typeof deleteHotelScriptSchema>;
type GetHotelScriptInput = TypeOf<typeof getHotelScriptSchema>;

export {
  createHotelScriptSchema,
  updateHotelScriptSchema,
  deleteHotelScriptSchema,
  getHotelScriptSchema,
  CreateHotelScriptInput,
  UpdateHotelScriptInput,
  DeleteHotelScriptInput,
  GetHotelScriptInput,
};
