import path from 'path';
import { Model } from 'objection';

import { ContactModel } from '../types/contact.interface';
import { BaseModel } from './base.model';

export class Contacts extends BaseModel implements ContactModel {
  uuid;
  firstName;
  lastName;
  jobTitle;
  bio;
  dateOfBirth;
  addresses;
  comments;
  ownerId;
  isFavourite;

  static tableName = 'contacts';

  static relationMappings = {
    comments: {
      modelClass: path.join(__dirname, 'comments.model'),
      relation: Model.HasManyRelation,
      join: {
        from: 'contacts.id',
        to: 'comments.contactId',
      },
    },
    addresses: {
      modelClass: path.join(__dirname, 'addresses.model'),
      relation: Model.HasManyRelation,
      join: {
        from: 'contacts.id',
        to: 'addresses.contactId',
      },
    },
    emails: {
      modelClass: path.join(__dirname, 'emails.model'),
      relation: Model.HasManyRelation,
      join: {
        from: 'contacts.id',
        to: 'emails.contactId',
      },
    },
  };
}
