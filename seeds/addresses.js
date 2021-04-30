/* eslint-disable @typescript-eslint/no-var-requires */

const faker = require('faker');
const dotenv = require('dotenv');

dotenv.config();

const TABLE_NAME = 'addresses';
const QUANTITY = process.env.QUANTITY ?? 10;

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).truncate()
    .then(() => {
      const seedData = [];
      for (let index = 1; index <= QUANTITY; index++) {
        seedData.push({
          contact_id: index,
          address1: faker.address.streetAddress(),
          address2: faker.address.streetAddress(),
          address3: faker.address.streetAddress(),
          city: faker.address.city(),
          county: faker.address.county(),
          postCode: faker.address.zipCode(),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        });
      }
      // Inserts seed entries
      return knex(TABLE_NAME).insert(seedData);
    });
};
