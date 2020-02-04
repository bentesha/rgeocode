const turf = require('@turf/turf')
const uuid = require('uuid')
const geojson = require('../geojson/ug')
const _ = require('lodash')

const startCase = string => _.startCase(string.toLowerCase())

exports.up = async function(knex) {
  const boundaries = []
  turf.featureEach(geojson, feature => {
    const boundary = {
      id: uuid(),
      admin_level0: 'Uganda',
      admin_level1: startCase(feature.properties.ADM1_EN),
      admin_level2: startCase(feature.properties.ADM2_EN),
      admin_level3: startCase(feature.properties.ADM3_EN),
      geometry: knex.raw('ST_GeomFromGeoJson(?)', JSON.stringify(feature.geometry))
    }
    boundaries.push(boundary)
  })

  for (const boundary of boundaries) {
    await knex.into('boundary').insert(boundary)
  }
};

exports.down = function(knex) {
  return knex.from('boundary').where({ admin_level0: 'Uganda' }).delete()
};
