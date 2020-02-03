const turf = require('@turf/turf')
const uuid = require('uuid')
const features = require('../geojson/tz.json')
const _ = require('lodash')

const startCase = string => _.startCase(string.toLowerCase())

exports.up = async function(knex) {
  const shapes = []
  turf.featureEach(features, feature => {
    const geo = turf.getGeom(feature)
    const shape = {
      id: uuid(),
      admin_level0: 'Tanzania',
      admin_level1: startCase(feature.properties.ADM1_EN),
      admin_level2: startCase(feature.properties.ADM2_EN),
      admin_level3: startCase(feature.properties.ADM3_EN),
      geometry: knex.raw('ST_GeomFromGeoJSON(?)', JSON.stringify(geo))
    }
    shapes.push(shape)
  })
  for(const shape of shapes) {
    await knex.into('boundary').insert(shape)
  }
};

exports.down = function(knex) {
  return knex.from('boundary').where({ admin_level0: 'Tanzania' }).delete()
};
