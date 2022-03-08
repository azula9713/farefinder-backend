import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

const dbConnect = async () => {
  const dbUser = config.get<string>('mongo.username');
  const dbPassword = config.get<string>('mongo.password');
  const dbName = config.get<string>('mongo.dbName');
  const dbHost = config.get<string>('mongo.host');

  const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
  const localUri = `mongodb://${dbHost}/${dbName}`;
  try {
    await mongoose.connect(localUri);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

export default dbConnect;
