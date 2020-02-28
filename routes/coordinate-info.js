const express = require('express')
const turf = require('@turf/turf')
const config = require('../config')
const Joi = require('joi')
const Knex = require('knex')

const router = express.Router()
const knex = Knex(config().database)

router.get('/coordinate-info', ({ query }, response, next) => {
  ;(async () => {
    const schema = Joi.object({
      latitude: Joi.number()
        .required()
        .min(-180)
        .max(180),
      longitude: Joi.number()
        .required()
        .min(-180)
        .max(180)
    })
    const location = await schema.validate(query)
    const point = {
      type: 'Point',
      coordinates: [location.longitude, location.latitude]
    }

    const level0SubQuery = knex
      .from('boundary_level0')
      .whereRaw(
        'ST_Contains(geometry, ST_GeomFromGeoJSON(?))',
        JSON.stringify(point)
      )
      .select('level0_name')
      .first()

    const level1SubQuery = knex
      .from('boundary_level1')
      .whereRaw(
        'ST_Contains(geometry, ST_GeomFromGeoJSON(?))',
        JSON.stringify(point)
      )
      .where('level0_name', knex.raw('?', level0SubQuery))
      .select('level1_name')
      .first()

    const level2SubQuery = knex
      .from('boundary_level2')
      .whereRaw(
        'ST_Contains(geometry, ST_GeomFromGeoJSON(?))',
        JSON.stringify(point)
      )
      .where('level1_name', knex.raw('?', level1SubQuery))
      .select('level2_name')
      .first()

    const level3SubQuery = knex
      .from('boundary_level3')
      .whereRaw(
        'ST_Contains(geometry, ST_GeomFromGeoJSON(?))',
        JSON.stringify(point)
      )
      .where('level2_name', knex.raw('?', level2SubQuery))
      .select('level3_name')
      .first()

    const result = await knex
      .from('boundary_level4')
      .whereRaw(
        'ST_Contains(geometry, ST_GeomFromGeoJSON(?))',
        JSON.stringify(point)
      )
      .where('level3_name', knex.raw('?', level3SubQuery))
      .select(
        'id',
        'level4_name',
        'level3_name',
        'level2_name',
        'level1_name',
        'level0_name',
        'level4_pcode',
        'level3_pcode',
        'level2_pcode',
        'level1_pcode',
        'level0_pcode'
      )
      .first()
    if (result === undefined) {
      return response.sendStatus(404)
    }
    console.log({ ...result })
    response.json(result)
  })().catch(next)
})

module.exports = router
