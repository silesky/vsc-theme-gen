const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const { tokenize } = require('./utils')

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(bodyParser.json())
app.use(allowCrossDomain)

const createRes = (status, data) => ({ status, data })
// Constants
const PORT = 8080

app.get('/', (req, res) => {
  res.send('Hello world!!!')
})

app.post('/api/tokenize', (req, res) => {
  const selectedLanguage = req.body.language || 'js'
  const code = req.body.code || ''
  const tokenized = tokenize(code)
  if (tokenized && req.body.code) {
    res.json(createRes(true, tokenized))
  } else {
    res.json(createRes(false, 'no token returned'))
  }
})

app.listen(PORT)

console.log(`Running on http://localhost:${PORT}`)
