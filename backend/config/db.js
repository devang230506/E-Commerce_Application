//Connect locally > mongodb
const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("MongoDB connected successfully, E-Commerce Application Running...");
    }
    catch (e) {
        console.log("Error Found, connection failed...", e)
    }
}

module.exports = connection;