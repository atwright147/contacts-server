import { Base } from './base.interface';
import { Address } from './address.interface';

export interface Contact {
  uuid: string,
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: Date,
  addresses: Address[],
  comments: string[],
}

export interface ContactModel extends Contact, Base {}
