import express from "express";
import { LoginUser, RegisterUser, AdminLogin, GetAllUsers,GetSingleUser ,UpdateUserSubscriptions } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const UserRouter = express.Router();

UserRouter.post("/login", LoginUser);
UserRouter.post("/register", RegisterUser);
UserRouter.post("/admin", AdminLogin);
UserRouter.post("/allusers",GetAllUsers);
UserRouter.post("/SingleUser",userAuth,GetSingleUser);
UserRouter.post("/updateSubscription",userAuth,UpdateUserSubscriptions);

export default UserRouter;