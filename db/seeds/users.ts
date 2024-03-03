import { fakerEN_GB as faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { UserModel } from '../../src/types/user.interface';

dotenv.config();

faker.seed(1234567);

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
    createdAt: String(knex.fn.now()),
    updatedAt: String(knex.fn.now()),
  };

  seedData.push(defaultUser);

  for (let index = 2; index <= QUANTITY; index++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    seedData.push({
      // id: index,
      contactId: index,
      firstName,
      lastName,
      email: faker.internet.exampleEmail({ firstName, lastName }),
      password: PASSWORD,
      active: 1,
      // @ts-ignore
      createdAt: knex.fn.now(),
      // @ts-ignore
      updatedAt: knex.fn.now(),
    });
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(seedData);
}
