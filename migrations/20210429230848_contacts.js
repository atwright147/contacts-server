const TABLE_NAME = 'contacts';

exports.up = (knex) => {
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

exports.down = (knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
