
const itemsSchema = require('../models/itemsModel')


require('dotenv').config()

exports.TransferAPI = async (req, res, next) => {
    try {
        var CodeDescriptionLocation_From = await itemsSchema.findOne(
            {
                code_description: req.body.code_description,
                location: req.body.locFrom,
            }
        )
        var check_CodeDescriptionLocation_Existing = await itemsSchema.findOne(
            {
                code_description: req.body.code_description,
                location: req.body.locTo,
            }
        )
        if (!check_CodeDescriptionLocation_Existing) {
            await itemsSchema.insertMany([{
                item_code: req.body.code_description.split(" - ")[0],
                description: req.body.code_description.split(" - ")[1],
                quantity: req.body.qtyFrom,
                uom: "CS",
                location: req.body.locTo,
                code_description: req.body.code_description,
            }])
            await itemsSchema.findOneAndUpdate(
                {
                    code_description: req.body.code_description,
                    location: req.body.locFrom,
                },
                {
                    quantity: parseInt(CodeDescriptionLocation_From.quantity) - parseInt(req.body.qtyFrom),
                },
            )
        }
        else {
            await itemsSchema.findOneAndUpdate(
                {
                    code_description: req.body.code_description,
                    location: req.body.locTo,
                },
                {
                    quantity: parseInt(check_CodeDescriptionLocation_Existing.quantity) + parseInt(req.body.qtyFrom),
                },
            )
            await itemsSchema.findOneAndUpdate(
                {
                    code_description: req.body.code_description,
                    location: req.body.locFrom,
                },
                {
                    quantity: parseInt(CodeDescriptionLocation_From.quantity) - parseInt(req.body.qtyFrom),
                },
            )
        }
    }
    catch (error) {
        console.error(error)
    }
}