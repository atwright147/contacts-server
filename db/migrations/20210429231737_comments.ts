import { Knex } from 'knex';

const TABLE_NAME = 'comments';

exports.up = (knex: Knex) => {
  return knex.schema.createTableIfNotExists(TABLE_NAME, (table) => {
    table.increments();
    table.integer('contact_id');
    table.string('comment');
    table.timestamps();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
