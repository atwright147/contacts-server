import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { delay } from './middleware/delay';
import { Contacts } from './models/contacts.model';
import { Users } from './models/users.model';
import { generateToken, TokenPayload } from './utils/jwt/jwt';
import { checkAuthToken } from './middleware/check-auth-token';
import { tokenCookie } from './utils/token-cookie/token-cookie';
import { decodeAuthToken } from './middleware/decode-auth-token';

dotenv.config();

const ENV = process.env.NODE_ENV ?? 'development';
const SECRET = process.env.SECRET as string;

process.on('unhandledRejection', (error) => {
  console.info('unhandledRejection', (error as Error).message);
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

APP.all('*', decodeAuthToken);

APP.get('/api/v1/contacts', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query()
      .where('ownerId', '=', req['decodedToken'].sub)
      .withGraphFetched('[addresses, comments, emails]');
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

APP.get('/api/v1/avatar/:id', checkAuthToken, async (req, res) => {
  try {
    res.sendFile(path.resolve('images', 'avatars', `${req.params.id}.jpg`));
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.NOT_FOUND);
  }
});

APP.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.query().findOne({ email });
    console.info(user);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const { id, firstName, lastName } = user;
      res.status(StatusCodes.OK);
      tokenCookie(generateToken({ sub: id, user: { firstName, lastName }} as TokenPayload), res);
      res.json({ id, firstName, lastName });
    } else {
      res.sendStatus(StatusCodes.FORBIDDEN);
    }
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.get('/api/v1/auth/verify', async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(StatusCodes.FORBIDDEN).json({ message: 'Please provide a token' });
  } else {
    jwt.verify(token, SECRET, (err, value) => {
      if (err) {
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Failed to authenticate token' });
      }

      res.json({ id: value.sub, user: value.user });
    });
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
