// import model
const userModel = require("../models/userModel")


// define route handler

// 1. add items to user's cart
exports.addToCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;          // user's cart data will be stored in cartData
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({
            success: true,
            message: "Added to Cart"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}



// 2. remove items from user's cart
exports.removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({
            success: true,
            message: "Removed from cart"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error while removing item"
        })
    }
}



// 3. fetch user's cart data
exports.getCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({
            success: true,
            cartData
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error while fetching all cartdata"
        })
    }
}