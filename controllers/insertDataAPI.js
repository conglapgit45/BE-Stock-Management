
const itemsSchema = require('../models/itemsModel')
const usersSchema = require('../models/usersModel')
const locationsSchema = require('../models/locationsModel')
const xlsx = require('xlsx')


require('dotenv').config()

exports.InsertDataAPI = async (req, res, next) => {
    try {
        var wb = xlsx.readFile( "C:/Users/Truong-Cong.Lap/Downloads/My Local Workspace/Web Code/MERN - Self/backend/Stock_Loc.xlsx", { type:'binary' } )
        // const wsname = wb.SheetNames[0]

        var wsname = "Items"
        var ws = wb.Sheets[wsname]
        var data = xlsx.utils.sheet_to_json(ws)
        await itemsSchema.insertMany(data)

        wsname = "Users"
        ws = wb.Sheets[wsname]
        data = xlsx.utils.sheet_to_json(ws)
        await usersSchema.insertMany(data)

        wsname = "Locations"
        ws = wb.Sheets[wsname]
        data = xlsx.utils.sheet_to_json(ws)
        await locationsSchema.insertMany(data)

        return res.send('Data inserted')
    }
    catch (error) {
        console.log(error)
    }
}