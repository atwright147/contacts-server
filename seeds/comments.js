/* eslint-disable @typescript-eslint/no-var-requires */

const faker = require('faker');
const dotenv = require('dotenv');

dotenv.config();

const TABLE_NAME = 'comments';
const QUANTITY = process.env.QUANTITY ?? 10;

exports.seed = (knex) => {
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
