// import models
const foodModel = require('../models/foodModel')



// define route handler
// this shows all food list
exports.listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods,
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error",
        })
    }
}