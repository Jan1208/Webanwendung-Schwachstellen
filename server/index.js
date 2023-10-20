import express, { json, urlencoded } from 'express';
import 'dotenv/config';
import cors from "cors";

import apiRouter from './src/routes/api.js';

// Middleware

// DB-Connection
import client from './db.js';
import bodyParser from 'body-parser';

client.connect(function (err) {
  if (err) throw err;
});

const app = express();

app.use(cors());
app.use(json(), bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter);

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(`app is listening on port ${process.env.EXPRESS_SERVER_PORT}`);
});

export default app;