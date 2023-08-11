
const itemsSchema = require('../models/itemsModel')


require('dotenv').config()

exports.LocationAPI = async (req, res, next) => {
    try {
        var locationData = await itemsSchema.find({
            code_description: req.body.code_description
        })
        res.json({data: locationData})
    }
    catch (error) {
        console.log(error)
    }
}