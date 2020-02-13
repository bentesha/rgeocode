const express = require('express')
const turf = require('@turf/turf')
const config = require('../config')
const Joi = require('joi')
const Knex = require('knex')

const router = express.Router()
const knex = Knex(config().database)

router.get('/coordinate-info', ({ query }, response, next) => {
  (async () => {
    const schema = Joi.object({
      latitude: Joi.number().required().min(-180).max(180),
      longitude: Joi.number().required().min(-180).max(180)
    })
    const location = await schema.validate(query)
    const point = { type: 'Point', coordinates: [location.longitude, location.latitude] }

    const level0SubQuery = knex
      .from('boundary_level0')
      .whereRaw('ST_Contains(geometry, ST_GeomFromGeoJSON(?))', JSON.stringify(point))
      .select('admin_level0')
      .first()

    const level1SubQuery = knex
      .from('boundary_level1')
      .whereRaw('ST_Contains(geometry, ST_GeomFromGeoJSON(?))', JSON.stringify(point))
      // .where('admin_level0', knex.raw('?', level0SubQuery))
      .select('admin_level1')
      .first()

    const level2SubQuery = knex
      .from('boundary_level2')
      .whereRaw('ST_Contains(geometry, ST_GeomFromGeoJSON(?))', JSON.stringify(point))
      .where('admin_level1', knex.raw('?', level1SubQuery))
      .select('admin_level2')
      .first()

    const level3SubQuery = knex
      .from('boundary_level3')
      .whereRaw('ST_Contains(geometry, ST_GeomFromGeoJSON(?))', JSON.stringify(point))
      .where('admin_level2', knex.raw('?', level2SubQuery))
      .select('admin_level3')
      .first()

    const result = await knex
      .from('boundary_level4')
      .whereRaw('ST_Contains(geometry, ST_GeomFromGeoJSON(?))', JSON.stringify(point))
      .where('admin_level3', knex.raw('?', level3SubQuery))
      .select('id', 'admin_level4', 'admin_level3', 'admin_level2', 'admin_level1', 'admin_level0')
      .first()
    if (result === undefined) {
      return response.sendStatus(404)
    }
    console.log({ ...result })
    response.json(result)
  })().catch(next)
}) 

module.exports = router