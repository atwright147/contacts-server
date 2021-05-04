import { Model } from 'objection';

import { BaseModel } from './base.model';

export class Comments extends BaseModel {
  static tableName = 'addresses';

  static relationMappings = {
    contact: {
      modelClass: __dirname + '/contacts.model',
      relation: Model.HasOneRelation,
      join: {
        from: 'addresses.contact_id',
        to: 'contacts.id'
      }
    },
  };
}
