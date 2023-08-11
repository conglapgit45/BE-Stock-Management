
const mongoose = require('mongoose')

const locationsSchema = new mongoose.Schema(
	{
		location: {type: String, trim: true, required: [true, 'Location must be required']},
		capacity: {type: String, trim: true, required: [true, 'Capacity must be required']},
        uom: {type: String, trim: true, required: [true, 'UoM must be required']},
	},
    {
		timestamps: true
	},
)

const model = mongoose.model('locations', locationsSchema)
module.exports = model