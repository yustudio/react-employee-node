
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))
app.listen('5000')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))