import otpGenerator from 'otp-generator';

import express from 'express'
import User from '../models/userModel.js';
const router = express.Router();

router.post('/create', async (req, res) => {
    const { mobile } = req.body;
    const otp = otpGenerator.generate(6, { digits: true });
    let user = await User.findOne({ mobile });

    if (!user) {
        user = await User.create({ mobile, otp });
    } else {
        user.otp = otp;
        await user.save();
    }

    console.log("OTP:", otp) // replace with dns api

    res.json({ message: "OTP send successfully" });
})


export default router;