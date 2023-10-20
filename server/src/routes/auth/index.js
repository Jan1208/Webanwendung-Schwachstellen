import express from 'express';
import client from '../../../db.js';

import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';

const router = express.Router();
const BASE_PATH = "/";
const LOGIN_PATH = "login/";
const REGISTER_PATH = "register";
const CHECKKEY_PATH = "checkkey";

router.get(BASE_PATH + CHECKKEY_PATH, async (req, res) => {
  const token = req.get("Authorization").split(' ')[1].trim();
  console.log(token)
  try {
    const result = await jwt.verify(token, "GAAANNNZ GEHEEEIMM");
    //do something
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(401).send("Unauthorized");
  }

});

// /api/auth/login
router.post(BASE_PATH + LOGIN_PATH, async (req, res) => {
  const { username, password } = req.body;

  const result = await client.query({
    text: "SELECT username, password FROM users WHERE username = $1",
    values: [username]
  })

  if (result.rows.length > 0) {
    const user = result.rows[0];

    // hashe das eingegebene Passwort
    const hashedPassword = sha256(password);

    // und vergleiche es mit dem in der Datenbank
    if (hashedPassword === user.password) {
      // Passwort korrekt, wir sind eingeloggt

      const objectToSign = { username };

      const token = jwt.sign(objectToSign, "GAAANNNZ GEHEEEIMM")
      console.log(token)

      res.send({ success: true, jwt: token, user: objectToSign });
    } else {
      res.send({ success: false, message: "Passwort und Nutzername sind falsch!" });
    }
  } else {
    res.send({ success: false, message: "Passwort und Nutzername sind falsch!" });
  }



});

router.post(BASE_PATH + REGISTER_PATH, async (req, res) => {
  const { username, password } = req.body;

  // pruefe ob Nutzer bereits existiert
  const result = await client.query({
    text: "SELECT username FROM users WHERE username = $1",
    values: [username]
  });

  if (result.rows.length > 0) {
    // Nutzer mit diesem Namen existiert bereits
    res.status(200).send({ success: false, message: "Nutzer mit diesenem Nutzernamen existiert bereits" })
  } else {
    // hashe das eingegebene Passwort
    const hashedPassword = sha256(password);

    client.query({
      text: "INSERT INTO users (username, password) VALUES ($1, $2)",
      values: [username, hashedPassword]
    })

    res.status(200).send({ success: true, message: "Registrierung erfolgreich" })
  }
});

export default router;