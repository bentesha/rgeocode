const importGeojson = require('../utils/import-geojson')

exports.up = function(knex) {
  return importGeojson('tz.level3.json', 3, knex)
};

exports.down = function(knex) {
  return knex.from('boundary_level3').where({ level0_name: 'tz' }).delete()
};
