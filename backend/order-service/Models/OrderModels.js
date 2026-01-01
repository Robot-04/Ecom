import mongoose from "mongoose";

main().catch(err => console.log("MongoDB Connection error", err))


async function  main() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB is Connected")
}

const orderItemSchema = new mongoose.Schema({
    productID: {type: String, require: true},
    quality: {type: Number, require: true},
}) 

const orderSchema = new mongoose.Schema({
    userID: { type: String, require: true},
    items: [orderItemSchema],
    totalAmount: {type: Number, require: true},
    status: { type: String, default: "Pending"},
    createAt: { type: Date, default: Date.now},
})

export const Order = mongoose.model("Order", orderSchema)