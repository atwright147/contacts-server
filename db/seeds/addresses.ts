import { fakerEN_GB as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { AddressModel } from '../../src/types/address.interface';

dotenv.config();

faker.seed(1234567);

const TABLE_NAME = 'addresses';
const QUANTITY = Number(process.env.QUANTITY ?? 3);
const QUANTITY_CONTACTS = Number(process.env.QUANTITY_CONTACTS ?? 30);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  for (let contactIndex = 1; contactIndex <= QUANTITY_CONTACTS; contactIndex++) {
    const maxAddresses = faker.number.int({ min: 0, max: QUANTITY });

    for (let seedIndex = 1; seedIndex <= maxAddresses; seedIndex++) {
      const seedData: Omit<AddressModel, 'id'> = {
        contactId: contactIndex,
        address1: faker.location.streetAddress(),
        address2: faker.location.streetAddress(),
        address3: faker.location.streetAddress(),
        city: faker.location.city(),
        county: faker.location.county(),
        postCode: faker.location.zipCode(),
        isPrimary: contactIndex === 1 ? 1 : 0,
        // @ts-ignore
        createdAt: knex.fn.now(),
        // @ts-ignore
        updatedAt: knex.fn.now(),
      };

      await knex(TABLE_NAME).insert(seedData);
    }
  }
}
