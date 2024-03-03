import path from 'path';
import { Model } from 'objection';

import { AddressModel } from '../types/address.interface';
import { BaseModel } from './base.model';

export class Addresses extends BaseModel implements AddressModel {
  contactId;
  address1;
  address2;
  address3;
  city;
  county;
  postCode;
  isPrimary;

  static tableName = 'addresses';

  static relationMappings = {
    contact: {
      modelClass: path.join(__dirname, 'contacts.model'),
      relation: Model.HasOneRelation,
      join: {
        from: 'addresses.contactId',
        to: 'contacts.id',
      },
    },
  };
}
