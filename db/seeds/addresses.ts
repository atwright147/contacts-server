import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { AddressModel } from '../../src/types/address.interface';

dotenv.config();

faker.seed(1234567);
faker.locale = 'en_GB';

const TABLE_NAME = 'addresses';
const QUANTITY = process.env.QUANTITY ?? 10;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const seedData: Omit<AddressModel, 'id'>[] = [];
  for (let index = 1; index <= QUANTITY; index++) {
    seedData.push({
      contactId: index,
      address1: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      address3: faker.address.streetAddress(),
      city: faker.address.city(),
      county: faker.address.county(),
      postCode: faker.address.zipCode(),
      isPrimary: index === 1 ? 1 : 0,
      createdAt: knex.fn.now() as any,
      updatedAt: knex.fn.now() as any,
    });
  }

  await knex(TABLE_NAME).insert(seedData);
}
