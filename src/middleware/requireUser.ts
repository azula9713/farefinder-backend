import { NextFunction, Request, Response } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  //add user type validation

  if (!user) {
    return res.status(403).send({ error: 'You must be logged in!' });
  }

  return next();
};

export default requireUser;
