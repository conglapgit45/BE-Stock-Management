
require('dotenv').config()
const cookieParser = require('cookie-parser')


exports.LogoutAPI = async (req, res, next) => {
    try {
        // const authToken = await req.session.authToken
        // console.log('out: ' + authToken)
        console.log('out cookie: ' + await req.signedCookies.accessToken)
        // res.clearCookie('accessAuth').send()
        res.cookie('accessToken', 'shhh', { sameSite: 'none', maxAge: 1000*2, httpOnly: true, secure: true, signed: true })
        res.clearCookie('accessToken').send('User Logged out')
    }
    catch (error) {
        console.error(error)
        res.status(500).send()
    }
}