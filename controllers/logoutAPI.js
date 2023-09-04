
const cookieParser = require('cookie-parser')


exports.LogoutAPI = async (req, res, next) => {
    try {
        // const authToken = await req.session.authToken
        // console.log('out: ' + authToken)
        console.log('out cookie: ' + await req.signedCookies.authToken)
        // res.clearCookie('accessAuth').send()
        res.clearCookie('authToken').send()
        // res.clearCookie('session').send()
    }
    catch (error) {
        console.error(error)
        res.status(500).send()
    }
}