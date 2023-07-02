
const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
)

const model = mongoose.model('users', usersSchema)
module.exports = model