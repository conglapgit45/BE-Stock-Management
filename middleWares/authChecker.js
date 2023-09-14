
const jwt = require('jsonwebtoken')
const usersSchema = require('../models/usersModel')
const notifier = require('node-notifier')


require('dotenv').config()

exports.AuthChecking = async (req, res, next) => {
    var isLoggedIn = false
    var authority = false
    try {
        const authToken = await req.signedCookies.authToken
        console.log('authChecker: ' + authToken)
        if (jwt.verify(req.header('accesstoken'), process.env.JWT_SECRET).authToken == authToken) {
            isLoggedIn = true
            // next()
        }
        if (isLoggedIn == true && req.header('role') == 'MANAGEMENT') {
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