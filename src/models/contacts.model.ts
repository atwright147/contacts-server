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
        to: 'comments.contact_id'
      }
    },
    addresses: {
      modelClass: __dirname + '/addresses.model',
      relation: Model.HasManyRelation,
      join: {
        from: 'contacts.id',
        to: 'addresses.contact_id'
      }
    },
  };
}
