
require('dotenv').config()
const cookieParser = require('cookie-parser')


exports.LogoutAPI = async (req, res, next) => {
    try {
        // const authToken = await req.session.authToken
        // console.log('out: ' + authToken)
        console.log('out cookie: ' + await req.signedCookies.authToken)
        // res.clearCookie('accessAuth').send()
        res.clearCookie('authToken', {
            domain: process.env.ACCEPTED_ORIGIN_001,
            path: '/'
        })
        // res.clearCookie('session').send()
        res.status(200).json('User Logged out')
    }
    catch (error) {
        console.error(error)
        res.status(500).send()
    }
}