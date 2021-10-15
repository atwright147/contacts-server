import { Model } from 'objection';

import { BaseModel } from './base.model'
import { UserModel } from '../types/user.interface';

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
      modelClass: __dirname + '/contacts.model',
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'contacts.ownerId'
      }
    },
  };
}
