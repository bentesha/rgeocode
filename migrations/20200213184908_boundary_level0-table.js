
exports.up = function(knex) {
  return knex.schema.createTable('boundary_level0', table => {
    table.string('id').primary()
    table.string('admin_level0').notNullable()
    table.specificType('geometry', 'geometry').notNullable()
    table.index['geometry']
    table.index('admin_level0')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('boundary_level0')
};
