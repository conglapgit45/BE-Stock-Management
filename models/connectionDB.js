
require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Database Connection Successfully.');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = { connectDB };