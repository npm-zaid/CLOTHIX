import UserModel from "../models/userModel.js";


// get all cart items
const getCartItems = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await UserModel.findById(userId);
    let cartdata = await user.cartdata;

    res.json({ success:true, cartdata});
    
  } catch (error) {
    res.status(500).json({sucess:false, message: error.message });
  }
}

//update cart item 
const updateCartItem = async (req, res) => {
 try {
    const {userId,itemId,size,quantity} = req.body;
    const user = await UserModel.findById(userId);
    let cart = await user.cartdata;
    cart[itemId][size] = quantity;
    await UserModel.findByIdAndUpdate(userId,{cartdata:cart})
    res.status(200).json({ message: "Cart item updated successfully" });
 } 
 catch (error) {
    res.status(500).json({ message: error.message });
    }
}

//add to cart
const addToCart = async (req, res) => {
 try {
    const {userId,itemId,size} = req.body;
    const user = await UserModel.findById(userId);
    let cart = await user.cartdata;
    if(cart[itemId]){
      if(cart[itemId][size]){
          cart[itemId][size] += 1
      }
      else{
          cart[itemId][size] = 1
      }

  }
  else{
      cart[itemId] = {}
      cart[itemId][size]=1
  }
   
    
    
     await UserModel.findByIdAndUpdate(userId,{cartdata:cart}); 
    res.status(200).json({ message: "Cart item added successfully" });
 
 }
 catch (error) {
    res.status(500).json({ message: error.message });
 }
}

export { getCartItems, updateCartItem, addToCart };
