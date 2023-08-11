
const jwt = require('jsonwebtoken')
const usersSchema = require('../models/usersModel')


require('dotenv').config()

exports.AuthChecking = async (req, res, next) => {
    var isLoggedIn = false
    var authority = false
    try {
        const authToken = await req.session.authToken
        console.log('auth: ' + authToken)
        if (jwt.verify(req.header('accesstoken'), process.env.JWT_SECRET).authToken == authToken) {
            isLoggedIn = true
            console.log(isLoggedIn)
            // next()
        }
        next()
    }
    catch (error) {
        console.log(error)
        // next()
    }
  }