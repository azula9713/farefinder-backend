const dbUsername = 'ffadmin';
const dbPassword = '6GoW8gacrsWqtbU1';

export default {
  port: ``,
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
  token: ``,
  marker: ``, //affiliateID
  currency: 'usd',
  language: 'en',
  host: 'localhost',
  jwtPublicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHfUhS/dEvx+Bs6UJHoqCRbA1N8X
oM37YhpxlUgtpNJptLRRAZ5wrhQ6WvgrqArI4qQb4uWSYVZCFPiekBaY+nud68cV
C1wMQFBKJiJqQlSkKdJ+wB0Gm3aCT33og13uFBqZXqqD/OxqBuqupXFBfX4VVz6R
cFMURAg5gaoHcUHpAgMBAAE=
-----END PUBLIC KEY-----`,
  jwtPrivateKey: ``,
};
