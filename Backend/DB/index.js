const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'businessdb',
    port: 5432,
  });
  

module.exports = pool;
