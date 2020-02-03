
exports.up = function(knex) {
  return knex.schema.createTable('boundary', table => {
    table.string('id').primary()
    table.string('admin_level0').notNullable()
    table.string('admin_level1').notNullable()
    table.string('admin_level2').notNullable()
    table.string('admin_level3').notNullable()
    table.specificType('geometry', 'geometry').notNullable()
    table.index['geometry']
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('boundary')
};
