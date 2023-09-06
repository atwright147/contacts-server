import { Model } from 'objection';

import { BaseModel } from './base.model';
import { EmailModel } from '../types/email.interface';

export class Emails extends BaseModel implements EmailModel {
  contactId;
  email;
  isPrimary;

  static tableName = 'emails';

  static relationMappings = {
    contact: {
      modelClass: __dirname + '/contacts.model',
      relation: Model.HasOneRelation,
      join: {
        from: 'emails.contactId',
        to: 'contacts.id'
      }
    },
  };
}
