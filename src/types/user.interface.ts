import { Base } from './base.interface';

export type binary = 0 | 1;

export interface User extends Base {
  contactId: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  active: binary,
}

export interface UserModel extends User, Base {}
