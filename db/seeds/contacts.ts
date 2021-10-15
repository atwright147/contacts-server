import faker from 'faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const TABLE_NAME = 'contacts';
const QUANTITY = process.env.QUANTITY_CONTACTS ?? 10;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const seedData = [];
  for (let index = 1; index <= QUANTITY; index++) {
    const FIRST_NAME = faker.name.firstName();
    const LAST_NAME = faker.name.lastName();

    const now = new Date();
    now.setFullYear(now.getFullYear() - 20);

    seedData.push({
      uuid: faker.datatype.uuid(),
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: faker.internet.exampleEmail(FIRST_NAME, LAST_NAME),
      dateOfBirth: faker.date.past(65, now).toISOString().split('T')[0],
      ownerId: faker.datatype.number({ min: 1, max: 3 }),
      createdAt: knex.fn.now(),
      updatedAt: knex.fn.now(),
    });
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(seedData);
}