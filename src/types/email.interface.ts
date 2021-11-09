import { Base } from './base.interface';
import { binary } from './binary.type';

export interface Email extends Base {
  contactId: number,
  email: string,
  isPrimary: binary,
}

export interface EmailModel extends Email, Base {}
