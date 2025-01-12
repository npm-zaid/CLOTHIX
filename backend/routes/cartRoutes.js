import express from "express";
import { getCartItems, updateCartItem, addToCart } from "../controllers/cartController.js";
import userAuth from "../middleware/userAuth.js";
const cartRouter = express.Router();

cartRouter.post("/add",userAuth, addToCart);
cartRouter.post("/get",userAuth, getCartItems);
cartRouter.post("/update",userAuth, updateCartItem);


export default cartRouter;