const importGeojson = require('../utils/import-geojson')

exports.up = function(knex) {
  return importGeojson('ke.level2.json', 2, knex)
};

exports.down = function(knex) {
  return knex.from('boundary_level2').where({ level0_name: 'ke' }).delete()
};
