// imports
const express = require("express")
const authMiddleware = require("../middleware/auth")
const orderRouter = express.Router();



// import controllers
const placeOrderController = require("../controllers/orderController");
const verifyOrderController = require("../controllers/orderController");
const userOrdersController = require("../controllers/orderController");
const listOrdersController = require("../controllers/orderController");
const updateStatusController = require("../controllers/orderController");




// define Api routes
orderRouter.post("/place", authMiddleware, placeOrderController.placeOrder);
orderRouter.post("/verify", verifyOrderController.verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrdersController.userOrders);
orderRouter.get("/list", listOrdersController.listOrders);
orderRouter.post("/status", updateStatusController.updateStatus);



// export
module.exports = orderRouter;