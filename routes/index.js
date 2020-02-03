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

    const result = await knex
      .from('boundary')
      .whereRaw('ST_Contains(geometry, ST_GeomFromGeoJSON(?))', JSON.stringify(point))
      .select('admin_level3', 'admin_level2', 'admin_level1', 'admin_level0')
      .first()
    if (result === undefined) {
      return response.sendStatus(404)
    }
    console.log({ ...result })
    response.json(result)
  })().catch(next)
}) 

module.exports = router