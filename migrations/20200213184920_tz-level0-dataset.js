const importGeojson = require('../utils/import-geojson')

exports.up = function(knex) {
  return importGeojson('tz.level0.json', 0, knex)
};

exports.down = function(knex) {
  return knex.from('boundary_level0').where({ admin_level0: 'tz' }).delete()
};