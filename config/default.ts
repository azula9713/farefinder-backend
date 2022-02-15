const dbUsername = 'ffadmin';
const dbPassword = '6GoW8gacrsWqtbU1';

export default {
  port: 1337,
  redis: {
    port: 6379,
    host: 'localhost',
    password: 'secret',
  },
  session: {
    secret: 'secretkey',
    resave: false,
    name: 'sid',
    idleTimeout: 1000 * 60 * 30,
  },
  dbUri: `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.6dsw4.mongodb.net/farefinder?retryWrites=true&w=majority`,
  // dbUri: `mongodb+srv://${dbUsername}:${dbPassword}@localhost:27017/farefinder`,
  token: '85de6f3a6caba8d221a1106573762b5f',
  marker: 189998, //affiliateID
  currency: 'usd',
  language: 'en',
  host: 'localhost',
};
