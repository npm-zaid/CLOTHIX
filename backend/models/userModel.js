import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    subscriber:{
        type: Boolean,
        default:false
    }
    ,
    cartdata:{
        type:Object,
        default:{}
    }
},{minimize:false});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
