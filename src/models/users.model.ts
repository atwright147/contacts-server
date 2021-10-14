import { Model } from 'objection';

import { BaseModel } from './base.model'

export class Users extends BaseModel {
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
