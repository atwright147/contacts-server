import { Model } from 'objection';

import { BaseModel } from './base.model';
import { AddressModel } from '../types/address.interface';

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
      modelClass: __dirname + '/contacts.model',
      relation: Model.HasOneRelation,
      join: {
        from: 'addresses.contactId',
        to: 'contacts.id',
      },
    },
  };
}
