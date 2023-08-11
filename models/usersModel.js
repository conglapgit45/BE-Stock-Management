
const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema(
	{
		fullname: {type: String, trim: true, required: [true, 'Fullname must be required']},
		email: {type: String, unique: true, trim: true, required: [true, 'Email must be required']},
		department: {type: String, trim: true, required: [true, 'Function must be required']},
        role: {type: String, trim: true, required: [true, 'Role must be required']},
		userID: {type: String, unique: true, trim: true, required: [true, 'User ID must be required']},
		password: {type: String, trim: true, required: [true, 'Password must be required'],
			minlength: [6, 'Password must be at least 6 characters']}
	},
    {
		timestamps: true
	},
)

const model = mongoose.model('users', usersSchema)
module.exports = model