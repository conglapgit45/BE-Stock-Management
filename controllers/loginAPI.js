
const jwt = require('jsonwebtoken')
const usersSchema = require('../models/usersModel')
const randomstring = require('randomstring')


require('dotenv').config()

exports.LoginAPI = async (req, res, next) => {
    try {
        var checkUserExisting = await usersSchema.findOne(
            {
                userID: req.body.userID,
            }
        )
        var checkPassword = (checkUserExisting && req.body.password === checkUserExisting.password) ? true: false
        if (checkPassword) {
            const authToken = randomstring.generate({
                length: 49,
                charset: ['alphabetic', 'numeric']
            })
            console.log('login: ' + authToken)
            res.cookie('authToken', authToken, { sameSite: 'none', maxAge: 1000*15, httpOnly: true, secure: true, signed: true })
            // console.log('login: ' + req.session.authToken)
            // req.session.authToken = authToken
            const accessToken = jwt.sign({authToken: authToken}, process.env.JWT_SECRET)
            res.status(201).json({data: {accessToken: accessToken, userID: checkUserExisting.userID, role: checkUserExisting.role, pageName: 'HOME'}, message:"Login Successfully"})
        }
        if (!req.body.userID || !req.body.password) {
            return res.status(400).json({data: null, message: 'User ID and Password are required'})
        }
        else if (!checkUserExisting) {
            return res.status(401).json({data: null, message: 'User ID is not existing'})
        }
        else if (!checkPassword) {
            return res.status(401).json({data: null, message: 'Password is incorrect'})
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send()
    }
}