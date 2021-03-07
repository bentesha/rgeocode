const express = require('express')
const router = express.Router()
const reverseGeocode = require('./reverse-geocode')

router.use(reverseGeocode)

module.exports = router