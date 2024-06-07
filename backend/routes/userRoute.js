// imports
const express = require("express")
const userRouter = express.Router();



// import controller
const loginUserController = require('../controllers/userController')
const registerUserController = require('../controllers/userController')




// Define Api routes
userRouter.post("/register", registerUserController.registerUser);
userRouter.post("/login", loginUserController.loginUser);



// export
module.exports = userRouter;