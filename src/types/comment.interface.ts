import { Base } from './base.interface';

export interface Comment extends Base {
  contactId: number,
  comment: string,
}

export interface CommentModel extends Comment, Base {}
