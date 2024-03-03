import { fakerEN_GB as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { CommentModel } from '../../src/types/comment.interface';

dotenv.config();

faker.seed(1234567);

const TABLE_NAME = 'comments';
const QUANTITY = Number(process.env.QUANTITY ?? 3);
const QUANTITY_CONTACTS = Number(process.env.QUANTITY_CONTACTS ?? 10);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  for (let contactIndex = 1; contactIndex <= QUANTITY_CONTACTS; contactIndex++) {
    const maxComments = faker.number.int({ min: 0, max: QUANTITY });

    for (let seedIndex = 1; seedIndex <= maxComments; seedIndex++) {
      const seedData: Omit<CommentModel, 'id'> = {
        contactId: contactIndex,
        comment: faker.lorem.sentences(2),
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
