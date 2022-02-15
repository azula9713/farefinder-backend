import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import config from 'config';
import cors from 'cors';

import logger from './utils/logger';
import routes from './routes/routes.index';
import dbConnect from './utils/dbConnect';

const port = config.get<number>('port');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, async () => {
  logger.info(`App is listening on port at localhost:${port}`);
  await dbConnect();
  routes(app);
});
