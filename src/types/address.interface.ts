import { Base } from './base.interface';

export interface Address {
  contactId: number,
  address1: string,
  address2: string,
  address3: string,
  city: string,
  county: string,
  postCode: string,
}

export interface AddressModel extends Address, Base {}
