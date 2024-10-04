const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database connected successfully on ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.error('Database connection failed:'.bgRed, error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDb;
