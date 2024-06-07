const mongoose = require("mongoose")
require("dotenv").config();


const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("DB Connected"))
    .catch((error) => {
        console.log("Issue in Connecting to Database")
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = connectDB;