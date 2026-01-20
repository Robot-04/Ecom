import { User } from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";  
import dotenv from 'dotenv';

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

export async function signup(req, res) {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'})
        }

        const exisrtingUser = await User.findOne({email})
        if(exisrtingUser){
            return res.status(400).json({message: 'User already existing'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, 
            email, 
            password:hashedPassword
        });
        
        await newUser.save()
        
        res.status(201).json({
            message: 'User Created Successfully', 
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch(error) {
        res.status(500).json({message:error.message})
        console.log('Signup failed', error);
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body;

         if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({email});
        
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const match = await bcrypt.compare(password, user.password);
        
        if(!match) return res.status(401).json({message: 'Invalid Credentials'})

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET, 
            {expiresIn: "1h"}
        ) 

        return res.json({
            message: "Login successfull", 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });   

    } catch(e) {
        res.status(500).json({message: e.message});
        console.log("Login Failed", e)
    }
} 