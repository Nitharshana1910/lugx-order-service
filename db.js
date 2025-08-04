const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'postgress',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'lugx-gaming',
  port: process.env.PORT
});

module.exports = pool;