import { Knex } from 'knex';

const TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
      table.increments();
      table.integer('contactId');
      table.string('firstName');
      table.string('lastName');
      table.string('email'); // aka username
      table.string('password');
      table.integer('active');
      table.timestamp('createdAt');
      table.timestamp('updatedAt');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (exists) {
    return knex.schema.dropTable(TABLE_NAME);
  }
}
