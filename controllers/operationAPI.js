
const itemsSchema = require('../models/itemsModel')


require('dotenv').config()

exports.OperationAPI = async (req, res, next) => {
    try {
        var itemsData = await itemsSchema.find({})
        itemsData = [...new Map(itemsData.map(item => [item['item_code'], item])).values()]
        itemsData = itemsData.sort((a, b) => parseFloat(a.item_code) - parseFloat(b.item_code))
        res.status(201).json({data: itemsData, message: 'List of items'})
        const authToken = await req.session.authToken
        console.log('operation: ' + authToken)
    }
    catch (error) {
        console.log(error)
    }
}