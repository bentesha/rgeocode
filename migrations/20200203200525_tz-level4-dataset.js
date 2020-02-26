const importGeojson = require('../utils/import-geojson')

exports.up = function(knex) {
  return importGeojson('tz.level4.json', 4, knex)
};

exports.down = function(knex) {
  return knex.from('boundary_level4').where({ level0_name: 'tz' }).delete()
};
