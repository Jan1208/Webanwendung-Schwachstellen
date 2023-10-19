import express from 'express';
import client from '../../db.js';

import loginRouter from './auth/index.js';

const router = express.Router();
const BASE_PATH = '/';
const AUTH_PATH = 'auth/'

router.get(BASE_PATH, (req, res) => {
  queryDatabase();

  res.send('Api in development')
});

router.use(BASE_PATH + AUTH_PATH, loginRouter);

function queryDatabase() {
  const query = `
      DROP TABLE IF EXISTS users;
      CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(50), age INTEGER);
      INSERT INTO users (name, age) VALUES ('max', 14);
      INSERT INTO users (name, age) VALUES ('paul', 19);
      INSERT INTO users (name, age) VALUES ('jack', 55);
  `;

  client
    .query(query)
    .then(() => {
      console.log('Table created successfully!');
    })
    .catch(err => console.log(err));
}

export default router;