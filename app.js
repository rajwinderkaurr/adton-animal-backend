const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config')
const cookieParser = require('cookie-parser');
require('dotenv').config()

const PORT = process.env.PORT || 4030
const MONGO_URL = process.env.MONGO_URL

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/users', require('./routes/userRouter'))
app.use('/api', require('./routes/animalRouter'))
app.use('/api', require('./routes/categoryRouter'))

app.get('/', (req, res) => {
    res.json({ message: "Congrats! Server started. Use the front end to query..." })
})

mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, err => {
    if (err) throw error
    console.log("Connected to MongoDB")
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))