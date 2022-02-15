import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

const dbConnect = async () => {
  const dbUri = config.get<string>('dbUri');
  try {
    await mongoose.connect(dbUri);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

export default dbConnect;
