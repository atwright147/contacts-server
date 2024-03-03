import { fakerEN_GB as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { EmailModel } from '../../src/types/email.interface';

dotenv.config();

faker.seed(1234567);

const TABLE_NAME = 'emails';
const QUANTITY = 100;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const seedData: Omit<EmailModel, 'id'>[] = [];
  for (let index = 1; index <= QUANTITY; index++) {
    const maxEmails = faker.number.int(3) + 1;

    for (let emailIndex = 1; emailIndex <= maxEmails; emailIndex++) {
      seedData.push({
        contactId: index,
        email: faker.internet.exampleEmail(),
        isPrimary: emailIndex === 1 ? 1 : 0,
        // @ts-ignore
        createdAt: knex.fn.now(),
        // @ts-ignore
        updatedAt: knex.fn.now(),
      });
    }
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(seedData);
}
