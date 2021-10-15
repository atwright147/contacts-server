import faker from 'faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const TABLE_NAME = 'comments';
const QUANTITY = process.env.QUANTITY ?? 10;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const seedData = [];
  for (let index = 1; index <= QUANTITY; index++) {
    seedData.push({
      contactId: index,
      comment: faker.lorem.sentences(2),
      createdAt: knex.fn.now(),
      updatedAt: knex.fn.now(),
    });
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(seedData);
}