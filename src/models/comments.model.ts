import { Model } from 'objection';

import { BaseModel } from './base.model';
import { CommentModel } from '../types/comment.interface';

export class Comments extends BaseModel implements CommentModel {
  contactId;
  comment;

  static tableName = 'comments';

  static relationMappings = {
    contact: {
      modelClass: __dirname + '/contacts.model',
      relation: Model.HasOneRelation,
      join: {
        from: 'comments.contactId',
        to: 'comments.id',
      },
    },
  };
}
