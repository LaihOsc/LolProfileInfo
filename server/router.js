const express = require('express')

const router = express.Router()

const getSummonerDataRoute = require('./routes/getSummonerDataRoute')



router.get('/summoner/:name', getSummonerDataRoute)

module.exports = router