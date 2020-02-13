
exports.up = function(knex) {
  return knex.schema.createTable('boundary_level4', table => {
    table.string('id').primary()
    table.string('admin_level0').notNullable()
    table.string('admin_level1').notNullable()
    table.string('admin_level2').notNullable()
    table.string('admin_level3').notNullable()
    table.string('admin_level4').notNullable()
    table.specificType('geometry', 'geometry').notNullable()
    table.index['geometry']
    table.index('admin_level0')
    table.index('admin_level1')
    table.index('admin_level2')
    table.index('admin_level3')
    table.index('admin_level4')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('boundary_level4')
};
