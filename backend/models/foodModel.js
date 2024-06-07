// import
const mongoose = require("mongoose");


// schema for creating 
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
})



// export
// module.exports = mongoose.model("food", foodSchema);
module.exports = mongoose.models.food || mongoose.model("food", foodSchema);   //--> this can also be written as it can try to create model more than once