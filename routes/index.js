const express = require('express')
const router = express.Router()
const coordinateInfo = require('./coordinate-info')
const maps = require('./maps')


router.use(coordinateInfo)
router.use(maps)

module.exports = router