import { Base } from './base.interface';
import { binary } from './binary.type';

export interface Address {
  contactId: number,
  address1: string,
  address2: string,
  address3: string,
  city: string,
  county: string,
  postCode: string,
  isPrimary: binary;
}

export interface AddressModel extends Address, Base {}
