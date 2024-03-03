import { Model } from 'objection';

import path from 'path';
import { UserModel } from '../types/user.interface';
import { BaseModel } from './base.model';

export class Users extends BaseModel implements UserModel {
  contactId;
  firstName;
  lastName;
  email;
  password;
  active;

  static tableName = 'users';

  static relationMappings = {
    contacts: {
      modelClass: path.join(__dirname, 'contacts.model'),
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'contacts.ownerId',
      },
    },
  };
}
