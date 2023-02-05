const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')

app.use(cors())
app.use(router)
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Yeet')
})

app.listen(8080, () => {
    console.log('Server up and running')
})