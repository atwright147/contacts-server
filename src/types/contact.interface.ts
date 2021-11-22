import { Base } from './base.interface';
import { Address } from './address.interface';

export interface Contact {
  uuid: string,
  firstName: string,
  lastName: string,
  bio: string,
  dateOfBirth: string | Date,
  addresses: Address[],
  comments: string[],
  ownerId: number,
}

export interface ContactModel extends Contact, Base {}
