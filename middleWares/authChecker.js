
const jwt = require('jsonwebtoken')
const usersSchema = require('../models/usersModel')


require('dotenv').config()

exports.AuthChecking = async (req, res, next) => {
    var isLoggedIn = false
    var authority = false
    try {
        const authToken = await req.signedCookies.authToken
        if (jwt.verify(req.header('accesstoken'), process.env.JWT_SECRET).authToken == authToken) {
            isLoggedIn = true
            // next()
        }
        if (isLoggedIn == true && req.header('role') == 'ADMI') {
            console.log('Authority')
            next()
        }
    }
    catch (error) {
        console.log(error)
        // next()
    }
  }