import express from 'express';
import dotenv from 'dotenv';
import ConnectToMongo from './config/db.js';
dotenv.config();


const app = express();

ConnectToMongo();
const port = process.env.PORT;

app.use(express.json());
app.use('/',(req,res) => {

    res.send('Hello Rahad')
})


app.listen(port,() =>{
    console.log(`App is running on http://localhost:${port}`)
})


