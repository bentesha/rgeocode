const importGeojson = require('../utils/import-geojson')

exports.up = function(knex) {
  return importGeojson('ke.level1.json', 1, knex)
};

exports.down = function(knex) {
  return knex.from('boundary_level1').where({ level0_name: 'ke' }).delete()
};
