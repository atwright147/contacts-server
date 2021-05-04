import { Model } from 'objection';

import { BaseModel } from './base.model';

export class Comments extends BaseModel {
  static tableName = 'comments';

  static relationMappings = {
    contact: {
      modelClass: __dirname + '/contacts.model',
      relation: Model.HasOneRelation,
      join: {
        from: 'comments.contact_id',
        to: 'comments.id'
      }
    },
  };
}
