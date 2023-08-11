
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./models/connectionDB');
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const session = require('cookie-session')
const authRoute = require('./routes/authRoute')


require('dotenv').config()

connectDB()

const app = express()
app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true,
  // store: memoryStore,
  cookie: { maxAge: 1000*60*60*2 }
}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(cookieParser())
app.set('trust proxy', 1) // trust first proxy

//   app.use(cors())
app.use(cors({
    origin: [process.env.ACCEPTED_ORIGIN_001, process.env.ACCEPTED_ORIGIN_002, process.env.ACCEPTED_ORIGIN_003],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    // exposedHeaders: ['Content-Type'],
    maxAge: 60 * 60 * 4,
    credentials: true,
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
}))

app.use('/api', authRoute)

app.listen(process.env.APP_PORT, () => {
	console.log('Server running on port ' + process.env.APP_PORT)
})