import faker from 'faker';

import { IContact } from './interfaces/contact.interface';

const QUANTITY = process.env.QUANTITY ?? 5;

faker.seed(1234567);
faker.locale = 'en_GB';

const genAddress = () => ({
  address1: faker.address.streetAddress(),
  address2: faker.address.streetAddress(),
  address3: faker.address.streetAddress(),
  city: faker.address.city(),
  county: faker.address.county(),
  postCode: faker.address.zipCode(),
});

const models: IContact[] = [];

for (let modelIndex = 0; modelIndex < QUANTITY; modelIndex++) {
  const comment1 = faker.lorem.sentences(2);
  const comment2 = faker.lorem.sentences(2);

  const address1 = genAddress();
  const address2 = genAddress();

  const model = {
    id: modelIndex + 1,
    uuid: faker.datatype.uuid(),
    firstName: faker.name.findName().split(' ')[0],
    lastName: faker.name.lastName(),
    email: faker.internet.exampleEmail(),
    dateOfBirth: faker.date.past(faker.datatype.number(40) + 20),
    addresses: [address1, address2],
    comments: [comment1, comment2],
  }

  models.push(model);
}

export { models };
