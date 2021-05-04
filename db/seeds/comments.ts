/* eslint-disable @typescript-eslint/no-var-requires */

import faker from 'faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const TABLE_NAME = 'comments';
const QUANTITY = process.env.QUANTITY ?? 10;

exports.seed = (knex: Knex) => {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).truncate()
    .then(() => {
      const seedData = [];
      for (let index = 1; index <= QUANTITY; index++) {
        seedData.push({
          contact_id: index,
          comment: faker.lorem.sentences(2),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        });
      }
      // Inserts seed entries
      return knex(TABLE_NAME).insert(seedData);
    });
};
