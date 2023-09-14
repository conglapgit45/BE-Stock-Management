
require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


exports.ReportAPI = async (req, res, next) => {
    try {
        const accessToken = await req.signedCookies.accessToken
        console.log('Report cookie: ' + accessToken)
    }
    catch (error) {
        console.error(error)
        res.status(500).send()
    }
}