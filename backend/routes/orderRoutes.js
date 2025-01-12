import express from "express";
import { placeOrder,placeOrderRazorpay, allOrders, allOrdersFrontend, updateOrderStatus, verifyRazorpayPayment } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
const orderRouter = express.Router();

//Admin routes
orderRouter.post("/list",adminAuth,allOrders);
orderRouter.post("/status",adminAuth,updateOrderStatus);

//Payment routes
orderRouter.post("/place-order",userAuth,placeOrder);
orderRouter.post("/razorpay-payment",userAuth,placeOrderRazorpay);
orderRouter.post("/verify-razorpay",userAuth,verifyRazorpayPayment);

//User routes
orderRouter.post("/listfrontend",userAuth,allOrdersFrontend);

export default orderRouter;
