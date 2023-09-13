
require('dotenv').config()
const cookieParser = require('cookie-parser')


exports.ReportAPI = async (req, res, next) => {
    try {
        console.log('Report cookie: ' + await req.signedCookies.authToken)
    }
    catch (error) {
        console.error(error)
        res.status(500).send()
    }
}