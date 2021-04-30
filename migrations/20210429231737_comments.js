const TABLE_NAME = 'comments';

exports.up = (knex) => {
  return knex.schema.createTableIfNotExists(TABLE_NAME, (table) => {
    table.increments();
    table.integer('contact_id');
    table.string('comment');
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
