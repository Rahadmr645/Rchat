import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    mobile:{
        type: String,
        required: true,
        unique : true,
    },
    otp: String,
    isVerified: {
        type:Boolean,
        default: false,
    }
});

const User = mongoose.model('user', userSchema);

export default User;