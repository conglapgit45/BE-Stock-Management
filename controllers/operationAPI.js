
const itemsSchema = require('../models/itemsModel')


require('dotenv').config()

exports.OperationAPI = async (req, res, next) => {
    try {
        console.log("CHeck")
        var itemsData = await itemsSchema.find({})
        itemsData = [...new Map(itemsData.map(item => [item['item_code'], item])).values()]
        itemsData = itemsData.sort((a, b) => parseFloat(a.item_code) - parseFloat(b.item_code))
        res.status(201).json({data: itemsData, message: 'List of items'})
    }
    catch (error) {
        console.log(error)
    }
}