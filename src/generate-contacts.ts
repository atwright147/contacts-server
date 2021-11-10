import faker from 'faker';
import dotenv from 'dotenv';

dotenv.config();

import { Contact, ContactModel } from './types/contact.interface';
import { Address } from './types/address.interface';

const QUANTITY = process.env.QUANTITY ?? 5;

faker.seed(1234567);
faker.locale = 'en_GB';

const genAddress = (contactId: number): Address => ({
  contactId,
  address1: faker.address.streetAddress(),
  address2: faker.address.streetAddress(),
  address3: faker.address.streetAddress(),
  city: faker.address.city(),
  county: faker.address.county(),
  postCode: faker.address.zipCode(),
  isPrimary: faker.datatype.boolean() ? 1 : 0,
});

const models: Omit<Contact, 'createdAt' | 'updatedAt'>[] = [];

for (let modelIndex = 1; modelIndex < QUANTITY; modelIndex++) {
  const comment1 = faker.lorem.sentences(2);
  const comment2 = faker.lorem.sentences(2);

  const address1 = genAddress(modelIndex);
  const address2 = genAddress(modelIndex);

  const model: Omit<ContactModel, 'createdAt' | 'updatedAt'> = {
    id: modelIndex,
    uuid: faker.datatype.uuid(),
    firstName: faker.name.findName().split(' ')[0],
    lastName: faker.name.lastName(),
    dateOfBirth: faker.date.past(faker.datatype.number(40) + 20),
    addresses: [address1, address2],
    comments: [comment1, comment2],
    ownerId: modelIndex,
  }

  models.push(model);
}

export { models };
