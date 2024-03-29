import path from 'path';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import Knex from 'knex';
import { Model } from 'objection';

import { checkAuthToken } from './middleware/check-auth-token';
import { decodeAuthToken } from './middleware/decode-auth-token';
import { delay } from './middleware/delay';
import { TokenPayload, generateToken } from './utils/jwt/jwt';
import { tokenCookie } from './utils/token-cookie/token-cookie';

import { Contact } from './types/contact.interface';

import { Addresses } from './models/addresses.model';
import { Comments } from './models/comments.model';
import { Contacts } from './models/contacts.model';
import { Emails } from './models/emails.model';
import { Users } from './models/users.model';
import { UserResource } from './types/user.interface';

interface UserResponse {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
}

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';
const SECRET = process.env.SECRET as string;

console.info('Running in', ENV, 'mode');

process.on('unhandledRejection', (error) => {
  console.info('unhandledRejection', (error as Error).message);
});

const knexOptions = require('../knexfile').default;

const knex = Knex(knexOptions[ENV]);
Model.knex(knex as Knex.Knex<Record<string, string>>);

export const APP = express();

APP.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  }),
);
APP.use(cookieParser());
APP.use(express.json());
APP.use(express.static(path.join(__dirname, 'public')));
APP.use(delay);

APP.all('*', decodeAuthToken);

APP.get('/api/v1/contacts', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query()
      .select('id', 'firstName', 'lastName', 'isFavourite', 'gender', 'jobTitle')
      .orderBy([{ column: 'isFavourite', order: 'desc' }, { column: 'firstName' }, { column: 'lastName', order: 'asc' }])
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      .where('ownerId', '=', req['decodedToken'].sub);
    res.json(result);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.get('/api/v1/contacts/birthdays', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query()
      .select('id', 'firstName', 'lastName', 'isFavourite', 'dateOfBirth')
      .orderBy([{ column: 'dateOfBirth' }])
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      .where('ownerId', '=', req['decodedToken'].sub);
    res.json(result);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.get('/api/v1/contacts/favourites', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query()
      .select('id', 'firstName', 'lastName', 'isFavourite', 'jobTitle')
      .orderBy([{ column: 'firstName' }, { column: 'lastName', order: 'asc' }])
      .where('isFavourite', '1')
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      .where('ownerId', '=', req['decodedToken'].sub);
    res.json(result);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.get('/api/v1/contacts/:id', checkAuthToken, async (req, res) => {
  try {
    const result = await Contacts.query().where('id', Number(req.params.id)).withGraphFetched('[addresses, comments, emails]').first();
    res.json(result);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.post('/api/v1/contacts', checkAuthToken, async (req, res) => {
  const dataToInsert: Contact = req.body;
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  dataToInsert.ownerId = req['decodedToken'].sub;
  dataToInsert.uuid = 'uuid';

  try {
    const result = await Contacts.query().insertGraph(dataToInsert);
    res.json({ result });
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.patch('/api/v1/contacts/:id/favourite', checkAuthToken, async (req, res) => {
  try {
    await Contacts.query().patch({ isFavourite: 1 }).where('id', Number(req.params.id));
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.patch('/api/v1/contacts/:id/unfavourite', checkAuthToken, async (req, res) => {
  const contactId = Number(req.params.id);

  if (!Number.isInteger(contactId)) {
    console.info('Invalid ID', contactId);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  try {
    await Contacts.query().patch({ isFavourite: 0 }).where('id', contactId);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

APP.patch('/api/v1/contacts/:id', checkAuthToken, async (req, res) => {
  let statusCode = StatusCodes.OK;
  const contactId = Number(req.params.id);

  if (!Number.isInteger(contactId)) {
    console.info('Invalid ID', contactId);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  try {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    const existingResource: Contacts[] = await Contacts.query().where('id', contactId).andWhere('ownerId', '=', req['decodedToken'].sub);

    if (!existingResource.length) {
      statusCode = StatusCodes.NOT_FOUND;
    }
  } catch (err) {
    console.info(err);
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  const dataToInsert: Contact = req.body;

  try {
    const result = await Contacts.query()
      // .where('id', contactId!)
      .upsertGraph(dataToInsert);
    console.info({ result });
    statusCode = StatusCodes.OK;
  } catch (err) {
    console.info(err);
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  res.sendStatus(statusCode);
});

APP.delete('/api/v1/contacts/:id', checkAuthToken, async (req, res) => {
  let statusCode = StatusCodes.OK;

  const contactId = Number(req.params.id);

  if (!Number.isInteger(contactId)) {
    console.info('Invalid ID', contactId);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  try {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    const existingResource: Contacts[] = await Contacts.query().where('id', contactId).andWhere('ownerId', '=', req['decodedToken'].sub);

    if (!existingResource.length) {
      statusCode = StatusCodes.NOT_FOUND;
    }
  } catch (err) {
    console.info(err);
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  try {
    const deleted = await Contacts.query().deleteById(contactId);

    // FIXME: hack to delete all related data (should be handled by foreinkey constraints)
    await Addresses.query().where('contactId', contactId).delete();

    await Comments.query().where('contactId', contactId).delete();

    await Emails.query().where('contactId', contactId).delete();

    console.info(`Deleted: ${deleted}`);
    statusCode = StatusCodes.OK;
  } catch (err) {
    console.info(err);
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  res.sendStatus(statusCode);
});

APP.get('/api/v1/avatar/:id', checkAuthToken, async (req, res) => {
  const contactId = Number(req.params.id);

  if (!Number.isInteger(contactId)) {
    console.info('Invalid ID', contactId);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  try {
    res.sendFile(path.resolve(path.join('assets', 'images', 'avatars', `${contactId}.jpg`)));
  } catch (err) {
    console.info(err);
    res.sendStatus(StatusCodes.NOT_FOUND);
  }
});

APP.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const defaultUser: UserResource = { id: '', firstName: '', lastName: '', email: '', password: '' };

  try {
    const user = (await Users.query().findOne({ email })) ?? defaultUser;
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const { id, firstName, lastName, email } = user;

      res.status(StatusCodes.OK);
      const token = generateToken({ sub: id, user: { firstName, lastName } } as TokenPayload);
      tokenCookie(token, res);
      res.json({ id, firstName, lastName, email, token });
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
