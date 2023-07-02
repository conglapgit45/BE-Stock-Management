
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./models/connectionDB');
const usersSchemaser = require('./models/usersModel')


const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	usersSchemaser.insertMany([
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    ])
})

port = 2999
app.listen(port, () => {
	console.log('Server started on ' + port)
})