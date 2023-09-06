import { Knex } from 'knex';

const TABLE_NAME = 'emails';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
      table.increments();
      table.integer('contactId').notNullable().index()
        .references('id').inTable('contacts').onUpdate('CASCADE').onDelete('CASCADE');
      table.string('email');
      table.integer('isPrimary');
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
