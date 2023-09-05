
const itemsSchema = require('../models/itemsModel')


require('dotenv').config()

exports.OperationAPI = async (req, res, next) => {
    try {
        console.log("CHeck 01")
        var itemsData = await itemsSchema.find({})
        itemsData = [...new Map(itemsData.map(item => [item['item_code'], item])).values()]
        itemsData = itemsData.sort((a, b) => parseFloat(a.item_code) - parseFloat(b.item_code))
        console.log("CHeck 02")
        // return res.status(201).json({data: itemsData, message: 'List of items'})
        console.log(itemsData)
    }
    catch (error) {
        console.log(error)
    }
}