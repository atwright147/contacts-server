import { Knex } from 'knex';

const TABLE_NAME = 'contacts';

exports.up = (knex: Knex) => {
  return knex.schema.createTableIfNotExists(TABLE_NAME, (table) => {
    table.increments();
    table.string('uuid');
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.dateTime('dateOfBirth');
    table.timestamps();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
