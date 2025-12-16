import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

main().catch(err => console.log("MongoDB Connection error", err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is connected");
}

const productSchema = new mongoose.Schema({
    // id: {type: Number, AutoIncrement}
    name: {type: String, required: true},
    stock: {type: Number, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    catogory: {type: String, required: true, enum: ['plastic', 'metal', 'wood', 'clothe'], default: 'plastic'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

export const Product = mongoose.model('Product', productSchema);