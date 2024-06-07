// imports
const express = require("express")
const cartRouter = express.Router();
const authMiddleware = require("../middleware/auth")



// import controller
const addToCartController = require("../controllers/cartController")
const removeFromCartController = require("../controllers/cartController")
const getCartController = require("../controllers/cartController")



// define Api routes
cartRouter.post("/add", authMiddleware, addToCartController.addToCart)
cartRouter.post("/remove", authMiddleware, removeFromCartController.removeFromCart)
cartRouter.post("/get", authMiddleware, getCartController.getCart)



// export
module.exports = cartRouter;