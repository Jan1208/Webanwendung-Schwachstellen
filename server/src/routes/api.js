import express from 'express';
import client from '../../db.js';

const router = express.Router();
const BASE_PATH = '/';

router.get(BASE_PATH, (req, res) => {
  queryDatabase();

  res.send('Api in development')
});

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