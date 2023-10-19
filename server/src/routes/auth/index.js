import express from 'express';
import client from '../../../db.js';

import { sha256 } from 'js-sha256';

const router = express.Router();
const BASE_PATH = "/";
const LOGIN_PATH = "login/";
const REGISTER_PATH = "register";

router.post(BASE_PATH + LOGIN_PATH, async (req, res) => {
  const { username, password } = req.body;

  const result = await client.query({
    text: "SELECT username, password FROM users WHERE username = $1",
    values: [username]
  })

  const user = result.rows[0];

  // hashe das eingegebene Passwort
  const hashedPassword = sha256(password);

  // und vergleiche es mit dem in der Datenbank
  if (hashedPassword === user.password) {
    // Passwort korrekt, wir sind eingeloggt
    res.send({ success: true });
  } else {
    res.sendStatus(401)
    res.send({ success: false });
  }


});

router.post(BASE_PATH + REGISTER_PATH, async (req, res) => {
  const { username, password } = req.body;

  // pruefe ob Nutzer bereits existiert
  const result = await client.query({
    text: "SELECT username FROM users WHERE username = $1",
    values: [username]
  });

  if (result.rows.length >= 0) {
    // Nutzer mit diesem Namen existiert bereits
    res.send(200, { success: false, message: "Nutzer mit diesenem Nutzernamen existiert bereits" })
  } else {
    // hashe das eingegebene Passwort
    const hashedPassword = sha256(password);

    client.query({
      text: "INSERT INTO users (username, password) VALUES ($1, $2)",
      values: [username, hashedPassword]
    })

    res.send(200, { success: false, message: "Registrierung erfolgreich" })
  }
});

export default router;