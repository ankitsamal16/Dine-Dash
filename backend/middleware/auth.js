const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if(!token){
        return res.json({
            success: false,
            message: "Not Authorized Login Again"
        })
    }

    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;       // this will take the token and convert to user id from which we can add, remove or get cart 
        next();
    }
    catch(error){
        console.log(error)
        res.json({
            success: false,
            message: "Error Generated"
        })
    }
}



module.exports = authMiddleware