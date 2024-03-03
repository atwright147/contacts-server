import { Base } from './base.interface';
import { Address } from './address.interface';

export interface Contact {
  uuid: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  bio: string;
  dateOfBirth: string | Date;
  addresses: Address[];
  comments: string[];
  ownerId: number;
  isFavourite: boolean;
}

export interface ContactModel extends Contact, Base {}
