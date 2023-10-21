import express from 'express';
import client from '../../../db.js';

const router = express.Router();
const BASE_PATH = "/";
const LIST_PATH = "list/"

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

router.put(BASE_PATH, async (req, res) => {
  const { username, address } = req.body;

  const result = await client.query({
    text: "UPDATE users SET address = $1 WHERE username = $2",
    values: [address, username]
  });

  res.status(200).send({ error: false, message: `Nutzerdaten für Nutzer ${username} erfolgreich geändert!` });

});

function getStringForSQL(param) {
  if (!param || param === "undefined" || param === "null") {
    return "";
  } else {
    return param;
  }
};

router.get(BASE_PATH + LIST_PATH, async (req, res) => {
  try {
    let { group = "", username = "" } = req.query;

    const sql = `SELECT u.id, u.username, u.address, g.name as group FROM users u, groups g WHERE u.username LIKE '%${getStringForSQL(username)}%' AND g.id = u.groupid AND g.name LIKE '%${getStringForSQL(group)}%' AND g.name != 'SECRET';`

    console.log("Ausgeführtes SQL:", sql)

    const result = await client.query({
      text: sql
    })

    res.status(200).send({ error: false, users: result.rows })
  } catch (e) {
    res.status(500).send({ error: true, message: e.message })
  }

});


export default router;