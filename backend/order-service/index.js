import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OrderRoute from "./Routes/OrderRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.use('api/order', OrderRoute);

async function start() {
    try{
        await mongoose.connect(process.env.MONGODB_URI || '')

        console.log('Order Service Connected to MongoDB')

        app.listen(port, () =>{
            console.log(`Order Service Listening on port ${port}`)
        });
    } catch(err) {
        console.error('MongoDB connection error-Order service', err)
    }
}

start()