const geojson = require('../geojson/ke.json')
const turf = require('@turf/turf')
const uuid = require('uuid')
const _ = require('lodash')

const startCase = string => _.startCase(string.toLowerCase())

exports.up = async function(knex) {
  const shapes = []
  turf.featureEach(geojson, feature => {
    const shape = {
      id: uuid(),
      admin_level0: 'Kenya',
      admin_level1: startCase(feature.properties.L1_NAME),
      admin_level2: startCase(feature.properties.L2_NAME),
      admin_level3: startCase(feature.properties.L3_NAME),
      geometry: knex.raw('ST_GeomFromGeoJSON(?)', JSON.stringify(feature.geometry))
    }
    shapes.push(shape)
  })
  for (const shape of shapes) {
    await knex('boundary').insert(shape)
  }
};

exports.down = function(knex) {
  return knex('boundary').where({ admin_level0: 'Kenya' }).delete()
};
