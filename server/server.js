import express from 'express';
import dotenv from 'dotenv';
import ConnectToMongo from './config/db.js';
dotenv.config();
import userRoutes from './routes/userRoutes.js';

const app = express();

ConnectToMongo();
const port = process.env.PORT;
app.use(express.json())
// router 
app.use('/api/user/', userRoutes)
app.use('/', (req, res) => {

    res.send('Hello Rahad')
})


app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})


