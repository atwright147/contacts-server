import express from 'express';
import cors from 'cors';

import { models as contactsModels } from './generate-contacts';
import { delay } from './middleware/delay';

export const APP = express();

APP.use(cors());
APP.use(express.json());
APP.use(express.static(__dirname + '/public'));
APP.use(delay);

APP.get('/api/v1/contacts', (req, res) => {
  res.json(contactsModels);
});

APP.put('/api/v1/contacts', (req, res) => {
  res.sendStatus(200);
});

APP.patch('/api/v1/contacts', (req, res) => {
  res.sendStatus(200);
});

APP.post('/api/v1/contacts', (req, res) => {
  res.sendStatus(200);
});

APP.get('/api/v1/contacts/:id', (req, res) => {
  const contact = contactsModels.filter(item => item.id === Number(req.params.id));
  res.json(contact);
});
