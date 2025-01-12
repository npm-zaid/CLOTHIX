import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


//Login user 
const LoginUser = async (req, res) => {
    try {
        const { email,password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Register user
const RegisterUser = async (req, res) => {
    try {
       const { username, email, password } = req.body;
       const existingUser = await UserModel.findOne({ email });
       if (existingUser) {
        return res.json({success:false, message: "User already exists" });
       }
       if (!validator.isEmail(email)) {
        return res.json({success:false, message: "Invalid email" });
       }
       if (password.length < 8) {
        return res.json({success:false, message: "Password is not strong enough" });
       }
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       const newUser = new UserModel({ 
         username, 
         email, 
         password: hashedPassword,
         registrationDate: new Date() 
       });
      const user = await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
       res.json({success: true, message: "User registered successfully",token});
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Admin login
const AdminLogin = async (req,res) => {
    try{
   const { email, password } = req.body;
   if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.json({ success: true, message: "Admin login successful", token });
   } else {
    res.json({ success: false, message: "Invalid credentials" });
   }
}
catch (error) {
    res.status(500).json({ error: error.message});
}
}

//get all users
const GetAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});  // Exclude password field
        res.json({ success: true, users });
    }
    catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

//get single user

const GetSingleUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//update user subscriptions

const UpdateUserSubscriptions = async (req, res) => {
    try {
        const { userId, isSubscribed } = req.body;
        const user = await UserModel.findByIdAndUpdate( userId,{subscriber: isSubscribed }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        } 
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { LoginUser, RegisterUser, AdminLogin, GetAllUsers ,GetSingleUser,UpdateUserSubscriptions };





