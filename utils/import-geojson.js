const turf = require('@turf/turf')
const uuid = require('uuid')
const _ = require('lodash')
const path = require('path')

const startCase = string => _.startCase(string.toLowerCase())

module.exports = async function(fileName, level = 0, knex) {
  const filePath = path.resolve(__dirname, '../geojson', fileName)
  const features = require(filePath)
  const shapes = []
  turf.featureEach(features, feature => {
    const shape = {
      id: uuid(),
      level0_name: feature.properties.level0,
      level0_pcode: feature.properties.id0,
      geometry: knex.raw('ST_GeomFromGeoJSON(?)', JSON.stringify(feature.geometry))
    }
    for (let count = 1; count <= level; count++) {
      shape[`level${count}_name`] = startCase(feature.properties[`level${count}`])
      shape[`level${count}_pcode`] = feature.properties[`id${count}`]
    }
    shapes.push(shape)
  })
  for(const shape of shapes) {
    await knex.into(`boundary_level${level}`).insert(shape)
  }
}
