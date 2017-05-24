'use strict'

const express = require('express')
const { tokenize } = require('./utils')

// Constants
const PORT = 8080

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world!!!')
})
app.get('/api', (req, res) => {
  // const token = tokenize("console.log('hello'))")
  // res.json(token)
})

app.listen(PORT)
console.log(`Running on http://localhost:${PORT}`)
