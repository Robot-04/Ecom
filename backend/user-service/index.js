import express from 'express';
import { signup, login } from './Controllers/UserController.js';
import cors from "cors";

// const express = require("express")
// const cors = require("cors")
const app = express();
const port = 3000;

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "PSOT"]
// }));

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    console.log("Hello World");
    res.send("Hello Alien");
})

app.post('/signup', signup);
app.post('/login', login);