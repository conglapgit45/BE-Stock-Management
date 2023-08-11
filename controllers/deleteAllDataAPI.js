
const itemsSchema = require('../models/itemsModel')
const usersSchema = require('../models/usersModel')
const locationsSchema = require('../models/locationsModel')


require('dotenv').config()

exports.DeleteAllDataAPI = async (req, res, next) => {
    try {
        await usersSchema.deleteMany({})
        await itemsSchema.deleteMany({})
        await locationsSchema.deleteMany({})
        return res.send('Data deleted')
    }
    catch (error) {
        console.log(error)
    }
}