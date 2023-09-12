
require('dotenv').config()
const cookieParser = require('cookie-parser')


exports.LogoutAPI = async (req, res, next) => {
    try {
        // const authToken = await req.session.authToken
        // console.log('out: ' + authToken)
        console.log('out cookie: ' + await req.signedCookies.authToken)
        // res.clearCookie('accessAuth').send()
        res.cookie('authToken', 'shhh', { sameSite: 'none', maxAge: 1, httpOnly: true, secure: true, signed: true })
        res.clearCookie('authToken').send('User Logged out')
    }
    catch (error) {
        console.error(error)
        res.status(500).send()
    }
}