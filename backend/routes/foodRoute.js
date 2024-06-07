// imports
const express = require("express")
const foodRouter = express.Router();
const multer = require("multer");



// import controller
const addFoodController = require('../controllers/addFoodController');
const listFoodController = require('../controllers/listFoodController');
const removeFoodController = require('../controllers/removeFoodController');




// Image Storage Engine using multer
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage: storage})
foodRouter.post("/add", upload.single("image"), addFoodController.addFood)





// define Api routes
foodRouter.post("/add", addFoodController.addFood)
foodRouter.get("/list", listFoodController.listFood)
foodRouter.post("/remove", removeFoodController.removeFood)




// export router
module.exports = foodRouter;