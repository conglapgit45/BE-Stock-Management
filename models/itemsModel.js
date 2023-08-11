
const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema(
	{
		item_code: {type: String, trim: true, required: [true, 'Item Code must be required']},
		description: {type: String, unique: true, trim: true, required: [true, 'Description must be required']},
		quantity: {type: String, trim: true, required: [true, 'Quantity must be required']},
        uom: {type: String, trim: true, required: [true, 'UoM must be required']},
		location: {type: String, unique: true, trim: true, required: [true, 'Location ID must be required']},
		code_description: {type: String, trim: true, required: [true, 'code_description must be required']}
	},
    {
		timestamps: true
	},
)

const model = mongoose.model('items', itemsSchema)
module.exports = model