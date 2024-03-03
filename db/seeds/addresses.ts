import { fakerEN_GB as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { AddressModel } from '../../src/types/address.interface';

dotenv.config();

faker.seed(1234567);

const TABLE_NAME = 'addresses';
const QUANTITY = Number(process.env.QUANTITY ?? 10);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const seedData: Omit<AddressModel, 'id'>[] = [];
  for (let index = 1; index <= QUANTITY; index++) {
    seedData.push({
      contactId: index,
      address1: faker.location.streetAddress(),
      address2: faker.location.streetAddress(),
      address3: faker.location.streetAddress(),
      city: faker.location.city(),
      county: faker.location.county(),
      postCode: faker.location.zipCode(),
      isPrimary: index === 1 ? 1 : 0,
      // @ts-ignore
      createdAt: knex.fn.now(),
      // @ts-ignore
      updatedAt: knex.fn.now(),
    });
  }

  await knex(TABLE_NAME).insert(seedData);
}
