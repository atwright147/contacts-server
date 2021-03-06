/* eslint-disable @typescript-eslint/no-explicit-any */

import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { ContactModel } from '../../src/types/contact.interface';

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const TABLE_NAME = 'contacts';
const QUANTITY = process.env.QUANTITY_CONTACTS ?? 10;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const seedData: Omit<ContactModel, 'addresses' | 'comments' | 'id'>[] = [];
  for (let index = 1; index <= QUANTITY; index++) {
    const FIRST_NAME = faker.name.firstName();
    const LAST_NAME = faker.name.lastName();

    const now = new Date();
    now.setFullYear(now.getFullYear() - 20);

    seedData.push({
      uuid: faker.datatype.uuid(),
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      jobTitle: faker.name.jobTitle(),
      bio: faker.lorem.paragraphs(faker.datatype.number(2) + 1),
      dateOfBirth: faker.date.past(65, now).toISOString().split('T')[0],
      ownerId: faker.datatype.number({ min: 1, max: 3 }),
      isFavourite: faker.datatype.boolean(),
      createdAt: knex.fn.now() as any,
      updatedAt: knex.fn.now() as any,
    });
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(seedData);
}
