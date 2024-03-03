import { fakerEN_GB as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { CommentModel } from '../../src/types/comment.interface';

dotenv.config();

faker.seed(1234567);

const TABLE_NAME = 'comments';
const QUANTITY = Number(process.env.QUANTITY ?? 10);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const seedData: Omit<CommentModel, 'id'>[] = [];
  for (let index = 1; index <= QUANTITY; index++) {
    seedData.push({
      contactId: index,
      comment: faker.lorem.sentences(2),
      // @ts-ignore
      createdAt: knex.fn.now(),
      // @ts-ignore
      updatedAt: knex.fn.now(),
    });
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(seedData);
}
