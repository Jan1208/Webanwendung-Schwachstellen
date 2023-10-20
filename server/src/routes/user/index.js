import express from 'express';
import client from '../../../db.js';

const router = express.Router();
const BASE_PATH = "/";

router.get(BASE_PATH, async (req, res) => {
  const { username } = req.query;

  const query = "SELECT * FROM users WHERE username = $1";

  const result = await client.query({
    text: query,
    values: [username]
  });

  const user = result.rows[0];

  res.status(200).send({ error: false, user: user })

});


export default router;