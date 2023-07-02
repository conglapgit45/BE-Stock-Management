const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://truongvodich2902:kJCx5KOet2swqo8E@cluster-truongconglap.ulabrrh.mongodb.net/simpledb?retryWrites=true&w=majority')
        console.log('Database Connection Successfully.');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = { connectDB };