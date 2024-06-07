// import models
const foodModel = require('../models/foodModel');
const fs = require("fs");


// define route handlers
exports.removeFood = async (req, res) => {
    try{
        await foodModel.findByIdAndDelete(req.body.id);
        // fs.unlink(`uploads/${foodToBeRemoved.image}`, ()=>{})      // This is purely done to delete the images in our file system in uploads folder. I think its ok even if we dont delete it for now.
        res.json({
            success: true,
            message: "Food Removed"
        })
        
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error while removing"
        })
    }
}




