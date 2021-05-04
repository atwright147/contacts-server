/* eslint-disable @typescript-eslint/no-var-requires */

const faker = require('faker');
const dotenv = require('dotenv');

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const TABLE_NAME = 'contacts';
const QUANTITY = process.env.QUANTITY ?? 10;

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).truncate()
    .then(() => {
      const seedData = [];
      for (let index = 1; index <= QUANTITY; index++) {
        seedData.push({
          uuid: faker.datatype.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.exampleEmail(),
          dateOfBirth: faker.datatype.datetime(),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        });
      }
      // Inserts seed entries
      return knex(TABLE_NAME).insert(seedData);
    });
};
