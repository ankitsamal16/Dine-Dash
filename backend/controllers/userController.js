// import model
const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")



// define route handler


// creating token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}



// 1. login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const existingUser = await userModel.findOne({email});

        // check for any existing user
        if(!existingUser){
            return res.json({
                success: false,
                message: "User does not exists"
            })
        }

        // if user exists then match the password
        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        if(!passwordMatch){
            return res.json({
                success: false,
                message: "Password not matching"
            })
        }

        // if password matching then generate a token
        const token = createToken(existingUser._id);
        res.json({
            success: true,
            token
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error while logging in"
        })
    }
} 




// 2. register user
exports.registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser){    // checking for already existing user
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // validating email format and strong password
        if(!validator.isEmail(email)){     // this can check if user's email is valid or not
            return res.json({
                success: false,
                message: "Please enter a valid email id"
            })
        }

        // check if password length is >8
        if(password.length < 8){
            return res.json({
                success: false,
                message: "Please enter a strong password of minimum length 8"
            })
        }

        // if all above conditions are not satisfied then we can create an account
        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({     // this is creation of new user account
            name: name,
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save();    // storing this new user in database

        // take user's id and generate token
        const token = createToken(user._id);
        res.json({
            success: true,
            token 
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success: false,
            message: "Error while registering user"
        })
    }
}