const http = require('http')
const handles = require('./handles')
const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/', (req, res) => {
    res.send('Birds home page')
})

router.get('/about', (req, res) => {
    res.send('About birds')
})

module.exports = router

const birds = require('./birds')


app.use('/birds', birds)
http
.createServer(handles.serverHandle)
.listen(8080)