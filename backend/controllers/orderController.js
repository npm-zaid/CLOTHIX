import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from 'razorpay';


const currency = "INR";
const deliveryCharge = 10;

const razorpayment = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
});


//placing order using COD
const placeOrder = async(req,res)=>{
    try {
        const{userId,items,amount,address} = req.body;
        const orderdata = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            paymentStatus:false,
            date:Date.now(),
        }
        const newOrder = new OrderModel(orderdata);
        await newOrder.save();
        //clear cart after order is placed
        await userModel.findByIdAndUpdate(userId,{cartdata:{}});
        res.status(200).json({success:true,message:"Order placed successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


//placing order using RAZORPAY
const placeOrderRazorpay = async(req,res)=>{
 
    try {
        const{userId,items,amount,address} = req.body;
        const orderdata = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"razorpay",
            paymentStatus:false,
            date:Date.now(),
        }
        const newOrder = new OrderModel(orderdata);
        await newOrder.save();

        const options = {
           amount:amount,
           currency:currency,
           receipt:newOrder._id,
        }

        await razorpayment.orders.create(options,(err,order)=>{
            if(err){
                return res.status(500).json({success:false,message:"Internal server error"});
            }
            res.status(200).json({success:true,order});
        });

      
       
       
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

//verify razorpay payment
 const verifyRazorpayPayment = async(req,res)=>{
    try {
        const {userId,razorpay_order_id} = req.body;
        const orderInfo = await razorpayment.orders.fetch(razorpay_order_id);
       if(orderInfo.status === "paid"){
        await OrderModel.findByIdAndUpdate(orderInfo.receipt,{paymentStatus:true});
        //clear cart after order is placed
        await userModel.findByIdAndUpdate(userId,{cartdata:{}});
        res.status(200).json({success:true,message:"Payment verified successfully"});
       }
       else{
        res.status(200).json({success:false,message:"Payment not verified"});
       }
        
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"});
    }

}

//all orders for admin panel
const allOrders = async(req,res)=>{
    try {
        const orders = await OrderModel.find({});
        res.json({success:true,orders});
        
    } catch (error) {
        console.log(error);
    }

}

//all orders for frontend
const allOrdersFrontend = async(req,res)=>{
try {
    const {userId} = req.body; 
    const orders = await OrderModel.find({userId});
    res.json({success:true,orders});
    
} catch (error) {
    console.log(error);
}
}

//update order status for admin panel
const updateOrderStatus = async(req,res)=>{
try {
    const {orderId,status} = req.body;
    await OrderModel.findByIdAndUpdate(orderId,{status});
    res.json({success:true,message:"Order status updated successfully"});
} catch (error) {
    console.log(error);
}
}


  


export {placeOrder,placeOrderRazorpay,allOrders,allOrdersFrontend,updateOrderStatus,verifyRazorpayPayment};