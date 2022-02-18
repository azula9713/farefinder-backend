import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import PopularLocationModel, { IPopularLocation } from '../models/popularLocation.model';

const createPopularLocation = async (input: DocumentDefinition<Omit<IPopularLocation, 'createdAt' | 'updatedAt'>>) => {
  return PopularLocationModel.create(input);
};

const findAllPopularLocations = async () => {
  return PopularLocationModel.find();
};

const findPopularLocation = async (query: FilterQuery<IPopularLocation>, options: QueryOptions = { lean: true }) => {
  const popularLocation = await PopularLocationModel.findOne(query, {}, options);
  return popularLocation;
};

const findAndUpdatePopularLocation = async (
  query: FilterQuery<IPopularLocation>,
  update: UpdateQuery<IPopularLocation>,
  options: QueryOptions,
) => {
  return PopularLocationModel.findOneAndUpdate(query, update, options);
};

const findAndDeletePopularLocation = async (query: FilterQuery<IPopularLocation>) => {
  return PopularLocationModel.deleteOne(query);
};

export { createPopularLocation, findAllPopularLocations, findPopularLocation, findAndUpdatePopularLocation, findAndDeletePopularLocation };
