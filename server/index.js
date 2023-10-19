import express, { json } from 'express';
import 'dotenv/config';

import apiRouter from './src/routes/api.js';

// Middleware

// DB-Connection
import client from './db.js';

client.connect(function (err) {
  if (err) throw err;
});

const app = express();

app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter);

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(`app is listening on port ${process.env.EXPRESS_SERVER_PORT}`);
  // log.info(`app is listening on port ${process.env.EXPRESS_SERVER_PORT}`);
});

export default app;