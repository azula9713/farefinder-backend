import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import HotelScriptModel, { IHotelScript } from '../models/hotelScripts.model';

const createHotelScript = async (input: DocumentDefinition<Omit<IHotelScript, 'createdAt' | 'updatedAt'>>) => {
  return HotelScriptModel.create(input);
};

const findAllHotelScripts = async () => {
  return HotelScriptModel.find();
};

const findHotelScript = async (query: FilterQuery<IHotelScript>, options: QueryOptions = { lean: true }) => {
  const hotelScript = await HotelScriptModel.findOne(query, {}, options);
  return hotelScript;
};

const findAndUpdateHotelScript = async (query: FilterQuery<IHotelScript>, update: UpdateQuery<IHotelScript>, options: QueryOptions) => {
  return HotelScriptModel.findOneAndUpdate(query, update, options);
};

const findAndDeleteHotelScript = async (query: FilterQuery<IHotelScript>) => {
  return HotelScriptModel.deleteOne(query);
};

export { createHotelScript, findAllHotelScripts, findHotelScript, findAndUpdateHotelScript, findAndDeleteHotelScript };
