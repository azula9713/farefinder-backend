import { Request, Response } from 'express';

import { CreateUserType } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import logger from '../utils/logger';

const createUserHandler = async (
  // eslint-disable-next-line @typescript-eslint/ban-types
  req: Request<{}, {}, CreateUserType['body']>,
  res: Response,
) => {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    logger.error(e);
    return res.status(409).send((e as Error).message); //Same email already exists
  }
};

export { createUserHandler };
