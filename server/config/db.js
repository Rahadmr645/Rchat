import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const DB_URL = process.env.DB_URL;

const ConnectToMongo = async () =>{
 try {
    await mongoose.connect(DB_URL,{})
    console.log("DB connected")
 } catch (error) {
    console.error("faild to connected DB",error)
 }
  
}

export default ConnectToMongo;