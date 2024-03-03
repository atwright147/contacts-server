import path from 'path';
import { Model } from 'objection';

import { EmailModel } from '../types/email.interface';
import { BaseModel } from './base.model';

export class Emails extends BaseModel implements EmailModel {
  contactId;
  email;
  isPrimary;

  static tableName = 'emails';

  static relationMappings = {
    contact: {
      modelClass: path.join(__dirname, 'contacts.model'),
      relation: Model.HasOneRelation,
      join: {
        from: 'emails.contactId',
        to: 'contacts.id',
      },
    },
  };
}
