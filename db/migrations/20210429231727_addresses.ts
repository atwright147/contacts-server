import { Knex } from 'knex';

const TABLE_NAME = 'addresses';

exports.up = (knex: Knex) => {
  return knex.schema.createTableIfNotExists(TABLE_NAME, (table) => {
    table.increments();
    table.integer('contact_id');
    table.string('address1');
    table.string('address2');
    table.string('address3');
    table.string('city');
    table.string('county');
    table.string('postCode');
    table.timestamps();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
