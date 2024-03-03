import path from 'path';
import { Model } from 'objection';

import { CommentModel } from '../types/comment.interface';
import { BaseModel } from './base.model';

export class Comments extends BaseModel implements CommentModel {
  contactId;
  comment;

  static tableName = 'comments';

  static relationMappings = {
    contact: {
      modelClass: path.join(__dirname, 'contacts.model'),
      relation: Model.HasOneRelation,
      join: {
        from: 'comments.contactId',
        to: 'comments.id',
      },
    },
  };
}
