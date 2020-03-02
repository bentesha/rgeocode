const express = require('express')
const router = express.Router()
const coordinateInfo = require('./coordinate-info')
const maps = require('./maps')
const locations = require('./locations')


router.use(coordinateInfo)
router.use(maps)
router.use('/locations', locations)

module.exports = router