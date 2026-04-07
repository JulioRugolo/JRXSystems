require('dotenv').config();
const { getMysqlBase } = require('./dbEnv');

const withDialect = (overrides = {}) => ({
  ...getMysqlBase(),
  dialect: 'mysql',
  ...overrides,
});

module.exports = {
  development: {
    ...withDialect(),
    logging: console.log,
  },
  test: {
    ...withDialect({
      database: process.env.DB_NAME || 'jrxsistemas_test',
    }),
    logging: false,
  },
  production: {
    ...withDialect(),
    logging: false,
  },
};
