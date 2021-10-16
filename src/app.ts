import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { delay } from './middleware/delay';
import { Contacts } from './models/contacts.model';
import { Users } from './models/users.model';
import { generateToken } from './utils/jwt/jwt';
import { defaultPropsToHide, Resource } from './utils/resource/resource';
import { User } from './types/user.interface';
import { checkAuthToken } from './middleware/check-auth-token';
import { tokenCookie } from './utils/token-cookie/token-cookie';

dotenv.config();

const ENV = process.env.NODE_ENV ?? 'development';

process.on('unhandledRejection', (error) => {
  console.info('unhandledRejection', (error as Error).message)
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexOptions = require('../knexfile').default;

const knex = Knex(knexOptions[ENV]);
Model.knex(knex);

export const APP = express();

APP.use(cors());
APP.use(cookieParser());
APP.use(express.json());
APP.use(express.static(path.join(__dirname, 'public')));
APP.use(delay);

APP.get('/api/v1/contacts', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query();
    res.json(result);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.get('/api/v1/contacts/:id', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query()
      .where('id', Number(req.params.id))
      .withGraphFetched('[addresses, comments]');
    res.json(result);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.post('/api/v1/contacts', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query().insert(req.body);
    res.json({ result });
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.patch('/api/v1/contacts/:id', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query()
      .where('id', Number(req.params.id))
      .update(req.body);
    res.json({ result });
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.delete('/api/v1/contacts/:id', checkAuthToken, async (req, res) => {
  try {
    const added = await Contacts.query().deleteById(Number(req.params.id));
    res.json({ added });
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.query().findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);
    const userResource = new Resource(user);

    if (isValidPassword) {
      res.status(StatusCodes.OK)
      tokenCookie(generateToken(userResource.safe([...defaultPropsToHide, 'active']) as User), res);
      res.end();
    } else {
      res.sendStatus(StatusCodes.FORBIDDEN);
    }
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.get('/api/v1/auth/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
