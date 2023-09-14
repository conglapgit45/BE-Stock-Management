
const jwt = require('jsonwebtoken')
const usersSchema = require('../models/usersModel')
const notifier = require('node-notifier')


require('dotenv').config()

exports.AuthChecking = async (req, res, next) => {
    var isLoggedIn = false
    var authority = false
    try {
        const accessToken = await req.signedCookies.accessToken
        console.log('authChecker: ' + accessToken)
        if (jwt.verify(accessToken, process.env.JWT_SECRET)) {
            isLoggedIn = true
            console.log(isLoggedIn)
            console.log(jwt.verify(accessToken, process.env.JWT_SECRET).accessToken)
            // next()
        }
        if (isLoggedIn == true && jwt.verify(accessToken, process.env.JWT_SECRET).accessToken.role == 'ADMIN') {
            console.log('Authority')
            next()
        }
        else {
            res.json({data: [], message: 'You are not authorized to access this function'})
            console.log('You are not authorized to access this function')
        }
    }
    catch (error) {
        console.log(error)
        // next()
    }
  }