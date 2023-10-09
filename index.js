
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./models/connectionDB');
const cookieParser = require('cookie-parser')
const session = require('express-session')    // const session = require('cookie-session')
const authRoute = require('./routes/authRoute')
const {spawn} = require('child_process')


require('dotenv').config()

connectDB()

const app = express()
app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'abcdefg',
//   resave: true,
//   saveUninitialized: true,
//   // store: memoryStore,
//   proxy : true,
//   cookie: { sameSite: 'none', secure: true, httpOnly: true, maxAge: 1000*60*60*2 }
// }))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(cookieParser())

// app.use(cors())
app.use(cors({
    // origin: '*',
    origin: [process.env.ACCEPTED_ORIGIN_001,process.env.ACCEPTED_ORIGIN_002,process.env.ACCEPTED_ORIGIN_003],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    // exposedHeaders: ['Content-Type'],
    maxAge: 60 * 60 * 4,
    credentials: true,
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
}))

app.use('/api', authRoute)

app.get('/python', (req, res) => {
    const pyResult = spawn('python', ['pythonScript.py'])
    pyResult.stdout.on('data', function(data) {
        data1 = data.toString()
    })
    pyResult.on('close', (code) => {
        res.send(data1)
    })
})

app.get('/', (req, res) => {
    res.cookie('token', '123456789', { sameSite: 'none', maxAge: 1000*10, httpOnly: true, secure: true, signed: false })
    res.send('login here')
})
app.get('/logout', async (req, res) => {
    const token = await req.cookies.token
    if (token) {
        console.log('authChecker: ' + token)
    }
    else {
        console.log('authChecker: ' + 'expired')
    }
    res.send('logout here')
})

app.listen(process.env.APP_PORT, () => {
	  console.log('Server running on port ' + process.env.APP_PORT)
})