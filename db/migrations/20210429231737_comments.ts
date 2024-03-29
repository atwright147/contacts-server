import { Knex } from 'knex';

const TABLE_NAME = 'comments';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
      table.increments();
      table.integer('contactId');
      table.string('comment');
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
