import { Knex } from 'knex';

const TABLE_NAME = 'addresses';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
      table.increments();
      table.integer('contactId');
      table.string('address1');
      table.string('address2');
      table.string('address3');
      table.string('city');
      table.string('county');
      table.string('postCode');
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
