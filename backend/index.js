// REMEMBER = To import in the way as we used to do in react we have to include "type": "module", after "main" in package.json
// we can then write as = 
// import express from "express" or import cors from "cors"   (these are the ES6 funtionalities)


// imports
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
require("dotenv").config();


// app config
const app = express();
const port = process.env.PORT || 4000;



// middleware
app.use(express.json());
app.use(cors());



// Database Connection 
connectDB();



// API ENDPOINTS
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))         // we can now access these images on browser using this command
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);




// default route
app.get("/", (req, res)=> {
    res.send("API WORKING")
})



// starting the express server
app.listen(port, () => {
    console.log(`Server Started Succesfully on http://localhost:${port}`)
})



