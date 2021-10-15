import { Model } from 'objection';
import { Base } from '../types/base.interface';

export class BaseModel extends Model implements Base {
  id;
  createdAt;
  updatedAt;

  constructor() {
    super();
    this.createdAt = '';
    this.updatedAt = '';
  }

  $beforeInsert(): void {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}
