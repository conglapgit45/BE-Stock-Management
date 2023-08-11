
const locationsSchema = require('../models/locationsModel')


require('dotenv').config()

exports.AllLocationAPI = async (req, res, next) => {
    try {
        var locationData = await locationsSchema.find({})
        locationData = locationData.sort((a, b) => parseFloat(a.location) - parseFloat(b.location))
        res.json({data: locationData})
    }
    catch (error) {
        console.log(error)
    }
}