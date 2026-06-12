const express = require('express')
const connectDB = require('../src/config/db')

const userRoutes = require('../src/routes/user.routes')
require('dotenv').config()
connectDB();
const app = express()

app.use(express.json())

app.use('/api/auth',userRoutes)




module.exports = app;