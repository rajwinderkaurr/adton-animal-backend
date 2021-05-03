const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config')
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter')
require('dotenv').config()

const PORT = process.env.PORT || 4030
const MONGO_URL = config.MONGO_URL

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/users', userRouter)

mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, err => {
    if (err) throw error
    console.log("Connected to MongoDB")
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))