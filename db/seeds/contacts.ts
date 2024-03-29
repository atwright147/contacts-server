import { SexType, fakerEN_GB as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Knex } from 'knex';
import { ContactModel } from '../../src/types/contact.interface';

dotenv.config();

faker.seed(1234567);

const TABLE_NAME = 'contacts';
const QUANTITY_CONTACTS = Number(process.env.QUANTITY_CONTACTS ?? 30);
const OLDEST_YEAR = Number(new Date().getFullYear()) - 1980;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  for (let contactIndex = 1; contactIndex <= QUANTITY_CONTACTS; contactIndex++) {
    const GENDER: SexType = faker.helpers.arrayElement(['male', 'female']);
    const FIRST_NAME = faker.person.firstName(GENDER);
    const LAST_NAME = faker.person.lastName(GENDER);

    const now = new Date();
    now.setFullYear(now.getFullYear() - 20);

    const seedData: Omit<ContactModel, 'addresses' | 'comments' | 'id'> = {
      uuid: faker.string.uuid(),
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      gender: GENDER,
      jobTitle: faker.person.jobTitle(),
      bio: faker.lorem.paragraphs(faker.number.int(2) + 1),
      dateOfBirth: faker.date.past({ years: OLDEST_YEAR, refDate: now }).toISOString().split('T')[0],
      ownerId: faker.number.int({ min: 1, max: 3 }),
      isFavourite: faker.datatype.boolean(),
      // @ts-ignore
      createdAt: knex.fn.now(),
      // @ts-ignore
      updatedAt: knex.fn.now(),
    };

    // Inserts seed entries
    await knex(TABLE_NAME).insert(seedData);
  }
}
