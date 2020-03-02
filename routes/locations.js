const express = require('express')
const config = require('../config')
const Knex = require('knex')
const Joi = require('@hapi/joi')

const knex = Knex(config().database)
const router = express.Router()

router.get('/:level/:pcode', ({ params }, response, next) => {
  ;(async () => {
    const schema = Joi.object({
      level: Joi.number()
        .min(1)
        .max(4)
        .required(),
      pcode: Joi.string().required()
    })
    const {
      error,
      value: { pcode, level }
    } = schema.validate(params)
    if (error) {
      const message = error.details[0].message
      return response.status(400).send(message)
    }
    const result = await knex
      .from(`boundary_level${level}`)
      .where(`level${level - 1}_pcode`, pcode)
      .distinct(`level${level}_pcode as pcode`, `level${level}_name as name`)
      .orderBy('name', 'asc')
    if (result.length === 0) {
      return response.sendStatus(404)
    }
    response.json(result)
  })().catch(next)
})

module.exports = router
