const turf = require('@turf/turf')
const uuid = require('uuid')
const features = require('../geojson/tz.level3.json')
const _ = require('lodash')

const startCase = string => _.startCase(string.toLowerCase())

exports.up = async function(knex) {
  const shapes = []
  turf.featureEach(features, feature => {
    const shape = {
      id: uuid(),
      admin_level0: feature.properties.level0,
      admin_level1: startCase(feature.properties.level1),
      admin_level2: startCase(feature.properties.level2),
      admin_level3: startCase(feature.properties.level3),
      geometry: knex.raw('ST_GeomFromGeoJSON(?)', JSON.stringify(feature.geometry))
    }
    shapes.push(shape)
  })
  for(const shape of shapes) {
    await knex.into('boundary_level3').insert(shape)
  }
};

exports.down = function(knex) {
  return knex.from('boundary_level3').where({ admin_level0: 'tz' }).delete()
};
