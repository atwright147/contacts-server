import { fakerEN_GB as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { EmailModel } from '../../src/types/email.interface';

dotenv.config();

faker.seed(1234567);

const TABLE_NAME = 'emails';
const QUANTITY = Number(process.env.QUANTITY ?? 3);
const QUANTITY_CONTACTS = Number(process.env.QUANTITY_CONTACTS ?? 30);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  for (let contactIndex = 1; contactIndex <= QUANTITY_CONTACTS; contactIndex++) {
    const maxEmails = faker.number.int({ min: 0, max: QUANTITY });

    for (let seedIndex = 1; seedIndex <= maxEmails; seedIndex++) {
      const seedData: Omit<EmailModel, 'id'> = {
        contactId: contactIndex,
        email: faker.internet.exampleEmail(),
        isPrimary: seedIndex === 1 ? 1 : 0,
        // @ts-ignore
        createdAt: knex.fn.now(),
        // @ts-ignore
        updatedAt: knex.fn.now(),
      };

      // Inserts seed entries
      await knex(TABLE_NAME).insert(seedData);
    }
  }
}
