import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import User from '../models/userModels.js';

dotenv.config();
const router = express.Router();

const SECRAT_KEY = process.env.SECRETE_KEY;
// rotuer one for create user 
router.post('/create', async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: "Must inter all field" });

        const isExist = await User.findOne({ email });

        if (isExist) return res.status(400).json({ message: "User already exist" });

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashPass,
        });
        await newUser.save();
        // create a token
        const token = jwt.sign({ name: newUser.name, id: newUser._id, email: newUser.email }, SECRAT_KEY, { expiresIn: "1h" })

        res.status(200).json({ message: "user create successfully", newUser, token })
    } catch (error) {
        res.status(500).json({ message: "faild to craete user", error: error.message })
    }
})



// route 2 for login
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Must inter all field" });

        const isExist = await User.findOne({ email });

        if (!isExist) return res.status(404).json({ message: "User not exist" });

        const comparePass = await bcrypt.compare(password, isExist.password);

        if (!comparePass) return res.status(404).json({ message: "unAuthorise cradintial" });

        // create a token
        const token = jwt.sign({ name: isExist.name, id: isExist._id, email: isExist.email }, SECRAT_KEY, { expiresIn: "1h" })

        res.status(200).json({ message: "user login successfully", token })
    } catch (error) {
        res.status(500).json({ message: "faild to login", error: error.message })
    }
})

export default router;

