const express = require('express')
const fs = require('fs')
const path = require('path')
const compression = require('compression')

const router = express.Router()
router.use(compression())

router.get('/maps/:country', ({ params }, response, next) => {
  (async () => {
    const filePath = path.resolve(__dirname, '../geojson/', `${params.country}.json`)
    if (!fs.existsSync(filePath)) {
      return response.sendStatus(404)
    }
    response.sendFile(filePath)
  })().catch(next)
})

module.exports = router