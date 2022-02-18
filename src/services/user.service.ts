import { omit } from 'lodash';
import { FilterQuery } from 'mongoose';

import UserModel, { IUser, UserInput } from '../models/user.model';
import logger from '../utils/logger';

const createUser = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), ['password']);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const validateUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return false;
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return false;
    }
    return omit(user.toJSON(), ['password']);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findUser = async (query: FilterQuery<IUser>) => {
  return UserModel.findOne(query, { password: 0 }).lean();
};

export { createUser, validateUser, findUser };
