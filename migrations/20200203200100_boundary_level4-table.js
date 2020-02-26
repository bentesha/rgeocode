
exports.up = function(knex) {
  return knex.schema.createTable('boundary_level4', table => {
    table.string('id').primary()
    table.string('level0_name').notNullable()
    table.string('level1_name').notNullable()
    table.string('level2_name').notNullable()
    table.string('level3_name').notNullable()
    table.string('level4_name').notNullable()
    table.string('level0_pcode').notNullable()
    table.string('level1_pcode').notNullable()
    table.string('level2_pcode').notNullable()
    table.string('level3_pcode').notNullable()
    table.string('level4_pcode').notNullable()
    table.specificType('geometry', 'geometry').notNullable()
    table.index['geometry']
    table.index('level0_name')
    table.index('level1_name')
    table.index('level2_name')
    table.index('level3_name')
    table.index('level4_name')
    table.index('level0_pcode')
    table.index('level1_pcode')
    table.index('level2_pcode')
    table.index('level3_pcode')
    table.index('level4_pcode')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('boundary_level4')
};
