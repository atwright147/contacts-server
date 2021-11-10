/* eslint-disable @typescript-eslint/no-explicit-any */

import faker from 'faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { UserModel } from '../../src/types/user.interface';

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const TABLE_NAME = 'users';
const QUANTITY = 3;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const SALT = await bcrypt.genSalt(10);
  const PASSWORD = await bcrypt.hash(process.env.SEED_PASSWORD as string, SALT);

  const seedData: Omit<UserModel, 'id'>[] = [];

  const defaultUser: Omit<UserModel, 'id'> = {
    contactId: 1,
    firstName: 'Admin',
    lastName: 'Istrator',
    email: 'admin@example.com',
    password: PASSWORD,
    active: 1,
    createdAt: knex.fn.now() as any,
    updatedAt: knex.fn.now() as any,
  }

  seedData.push(defaultUser);

  for (let index = 2; index <= QUANTITY; index++) {
    const FIRST_NAME = faker.name.firstName();
    const LAST_NAME = faker.name.lastName();

    seedData.push({
      // id: index,
      contactId: index,
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: faker.internet.exampleEmail(FIRST_NAME, LAST_NAME),
      password: PASSWORD,
      active: 1,
      createdAt: knex.fn.now() as any,
      updatedAt: knex.fn.now() as any,
    });
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(seedData);
}
