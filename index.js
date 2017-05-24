const express = require('express')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const { tokenize } = require('./utils')

const createRes = (success, msg) => ({ success, msg })
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
