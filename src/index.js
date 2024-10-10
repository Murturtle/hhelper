const express = require('express')
const canvasAPI = require('node-canvas-api')
const app = express()
const port = 3000
canvasAPI.getAccountIds()


app.use('/app',express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})