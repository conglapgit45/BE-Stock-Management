
const jwt = require('jsonwebtoken')
const usersSchema = require('../models/usersModel')


require('dotenv').config()

exports.LoggedinAPI = async (req, res, next) => {
    try {
        const token = await req.signedCookies.token    // if signed of cookie == false then use req.cookies.token
        console.log(token)
        if (!token) {
            return res.json({isLoggedIn: false, userID: ''})
        }
        var userData = await usersSchema.findOne(
            {
                userID: jwt.verify(token, process.env.JWT_SECRET).userID,
            }
        )
        res.json({
            isLoggedIn: true,
            userID: userData.userID,
            role: userData.role,
        })
    }
    catch (error) {
        console.log(error)
    }
  }