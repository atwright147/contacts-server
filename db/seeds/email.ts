/* eslint-disable @typescript-eslint/no-explicit-any */

import faker from 'faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { EmailModel } from '../../src/types/email.interface';

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const TABLE_NAME = 'emails';
const QUANTITY = 100;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const seedData: Omit<EmailModel, 'id'>[] = [];
  for (let index = 1; index <= QUANTITY; index++) {
    const maxEmails = faker.datatype.number(3) + 1;

    for (let emailIndex = 1; emailIndex <= maxEmails; emailIndex++) {
      seedData.push({
        contactId: index,
        email: faker.internet.exampleEmail(),
        isPrimary: emailIndex === 1 ? 1 : 0,
        createdAt: knex.fn.now() as any,
        updatedAt: knex.fn.now() as any,
      });
    }
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(seedData);
}
