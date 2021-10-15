import path from 'path';
import express from 'express';
import cors from 'cors';
import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { delay } from './middleware/delay';

dotenv.config();

const ENV = process.env.NODE_ENV ?? 'development';

process.on('unhandledRejection', (error) => {
  console.info('unhandledRejection', (error as Error).message)
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexOptions = require('../knexfile').default;

const knex = Knex(knexOptions[ENV]);
Model.knex(knex);

import { Contacts } from './models/contacts.model';
import { Users } from './models/users.model';
import { generateToken } from './utils/jwt/jwt';

export const APP = express();

APP.use(cors());
APP.use(express.json());
APP.use(express.static(path.join(__dirname, 'public')));
APP.use(delay);

APP.get('/api/v1/contacts', async (req, res) => {
  try {
    const result = await Contacts.query();
    res.json(result);
  } catch (err) {
    console.info(err);
    res.sendStatus(500);
  }
});

APP.get('/api/v1/contacts/:id', async (req, res) => {
  try {
    const result = await Contacts.query()
      .where('id', Number(req.params.id))
      .withGraphFetched('[addresses, comments]');
    res.json(result);
  } catch (err) {
    console.info(err);
    res.sendStatus(500);
  }
});

APP.post('/api/v1/contacts', async (req, res) => {
  try {
    const result = await Contacts.query().insert(req.body);
    res.json({ result });
  } catch (err) {
    console.info(err);
    res.sendStatus(500);
  }
});

APP.patch('/api/v1/contacts/:id', async (req, res) => {
  try {
    const result = await Contacts.query()
      .where('id', Number(req.params.id))
      .update(req.body);
    res.json({ result });
  } catch (err) {
    console.info(err);
    res.sendStatus(500);
  }
});

APP.delete('/api/v1/contacts/:id', async (req, res) => {
  try {
    const added = await Contacts.query().deleteById(Number(req.params.id));
    res.json({ added });
  } catch (err) {
    console.info(err);
    res.sendStatus(500);
  }
});

APP.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.query().findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);

    isValidPassword
      ? res.status(200).json({ token: generateToken(user) })
      : res.sendStatus(403);
  } catch (err) {
    console.info(err);
    res.sendStatus(500);
  }
});

// APP.post('/api/v1/auth/logout', async (req, res) => {
//   try {
//     // const result = await Users.query().insert(req.body);
//     // res.json({ result });
//   } catch (err) {
//     console.info(err);
//     res.sendStatus(500);
//   }
// });
