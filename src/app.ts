import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import config from 'config';
import cors from 'cors';
import Redis, { RedisOptions } from 'ioredis';
import session, { SessionOptions } from 'express-session';
import connectRedis from 'connect-redis';

import logger from './utils/logger';
import routes from './routes/routes.index';
import dbConnect from './utils/dbConnect';

const port = config.get<number>('port');

const REDIS_OPTIONS: RedisOptions = {
  host: config.get<string>('redis.host'),
  port: config.get<number>('redis.port'),
  password: config.get<string>('redis.password'),
};

const SESSION_OPTIONS: SessionOptions = {
  secret: config.get<string>('session.secret'),
  name: config.get<string>('session.name'),
  resave: config.get<boolean>('session.resave'),
  cookie: {
    maxAge: config.get<number>('session.idleTimeout'),
    //secure if application is on PROD
    secure: process.env.NODE_ENV === 'production',
    sameSite: true,
  },
  rolling: true,
  saveUninitialized: false,
};

const RedisStore = connectRedis(session);
const redisClient = new Redis(REDIS_OPTIONS);

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    ...SESSION_OPTIONS,
    store: new RedisStore({ client: redisClient }),
  }),
);

app.listen(port, async () => {
  logger.info(`App is listening on port at localhost:${port}`);
  await dbConnect();
  routes(app);
});
