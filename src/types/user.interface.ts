import { Base } from './base.interface';
import { binary } from './binary.type';

export interface UserResource {
  id: string | number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export interface User extends Base {
  contactId: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  active: binary,
}

export interface UserModel extends User, Base {}
