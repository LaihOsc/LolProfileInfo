const express = require('express')

const router = express.Router()

const getSummonerDataRoute = require('./routes/getSummonerDataRoute')
const getExampleDataRoute = require('./routes/getExampleDataRoute')



router.get('/summoner/:name', getSummonerDataRoute)
router.get('/summonerExample', getExampleDataRoute)

module.exports = router