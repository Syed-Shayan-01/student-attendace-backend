const express = require('express')
const Indexrouter = require('./routes/');
const env = require('dotenv').config()
const jwt = require('jsonwebtoken');
const mongoose = require('./db/connect');
var bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('./routes/auth');
const verifyToken = require('./middlewares/verfiy');
const attendRouter = require('./routes/Attendance');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
const PORT = process.env.PORT

app.use('/admin', verifyToken, Indexrouter)
app.use('/', attendRouter)
app.use('/auth', authRouter)
app.listen(PORT)