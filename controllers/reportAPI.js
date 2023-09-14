
require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


exports.ReportAPI = async (req, res, next) => {
    try {
        const accessToken = await req.signedCookies.accessToken
        console.log('Report cookie: ' + jwt.verify(accessToken, process.env.JWT_SECRET).accessToken)
    }
    catch (error) {
        console.error(error)
        res.status(500).send()
    }
}