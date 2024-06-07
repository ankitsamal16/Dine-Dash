// import 
const mongoose = require("mongoose")



// schema for creating
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {minimize: false})      // if we dont to minimize false then cart data will not be created 



// export
module.exports = mongoose.models.user || mongoose.model("user", userSchema); 