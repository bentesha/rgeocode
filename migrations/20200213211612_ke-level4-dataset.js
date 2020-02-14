const importGeojson = require('../utils/import-geojson')

exports.up = function(knex) {
  return importGeojson('ke.level4.json', 4, knex)
};

exports.down = function(knex) {
  return knex.from('boundary_level4').where({ admin_level0: 'ke' }).delete()
};
