import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'example',
  port: 5432,
})

export default client;


