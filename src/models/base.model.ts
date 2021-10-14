import { Model } from 'objection';

export class BaseModel extends Model {
  createdAt: string;
  updatedAt: string;

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
