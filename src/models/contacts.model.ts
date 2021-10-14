import { Model } from 'objection';

import { BaseModel } from './base.model'

export class Contacts extends BaseModel {
  static tableName = 'contacts';

  static relationMappings = {
    comments: {
      modelClass: __dirname + '/comments.model',
      relation: Model.HasManyRelation,
      join: {
        from: 'contacts.id',
        to: 'comments.contactId'
      }
    },
    addresses: {
      modelClass: __dirname + '/addresses.model',
      relation: Model.HasManyRelation,
      join: {
        from: 'contacts.id',
        to: 'addresses.contactId'
      }
    },
  };
}
