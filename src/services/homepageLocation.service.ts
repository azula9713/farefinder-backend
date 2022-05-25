import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import HomePageLocationModel, { IHomePageLocation } from '../models/homepageLocation.model';

const createHomePageLocation = async (input: DocumentDefinition<Omit<IHomePageLocation, 'createdAt' | 'updatedAt'>>) => {
  return HomePageLocationModel.create(input);
};

const findAllHomePageLocations = async () => {
  return HomePageLocationModel.find();
};

const findHomePageLocation = async (query: FilterQuery<IHomePageLocation>, options: QueryOptions = { lean: true }) => {
  return HomePageLocationModel.findOne(query, {}, options);
};

const findAndUpdateHomePageLocation = async (
  query: FilterQuery<IHomePageLocation>,
  update: UpdateQuery<IHomePageLocation>,
  options: QueryOptions,
) => {
  return HomePageLocationModel.findOneAndUpdate(query, update, options);
};

const findAndDeleteHomePageLocation = async (query: FilterQuery<IHomePageLocation>) => {
  return HomePageLocationModel.deleteOne(query);
};

export {
  createHomePageLocation,
  findAllHomePageLocations,
  findHomePageLocation,
  findAndUpdateHomePageLocation,
  findAndDeleteHomePageLocation,
};
