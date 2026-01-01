import { Order } from "../Models/OrderModels.js"
import axios from "axios"

const PRODUCT_SERVICE_URI = process.env.PRODUCT_SERVICE_URI;

export async function CreateOrder(req, res) {
    const { userID } = req.params
    const {items, totalAmount} = req.body
    try {
        
        // const productAvilable = await Promise.all(
        //     items.map(async ())
        // )

        const ProductAvilable = await Promise.all(
            items.map(async (item)=> {
                try {
                    const product = await axios.get(`${PRODUCT_SERVICE_URI}/api/products/${item.productId}`)
                    return product.data && product.data.stock >= item.quantity
                }catch(error) {
                    console.log(`Error checking product ${item.productId}:`, error.message);
                    return false;
                }
            })
        );

        const allAvilable = ProductAvilable.every(check => check === true);
        if(!allAvilable){
            return res.status(400).json({msg: "One or more items are out of stock :("})
        }

        const newOrder = new Order({
            userID, items, totalAmount
        })

        await newOrder.save()
        
        // Stock deduction
        await Promise.all(
            items.map(async (item) => {
                await axios.put(
                    `${PRODUCT_SERVICE_URI}/api/products/${item.productId}/deduct`,{
                        quantity:item.quantity,
                    }
                )
            })

        )
        res.status(201).json(newOrder)

    }catch(err) {
        res.status(500).send("Server Error", err)
        console.log(err)
    }
}

export async function GetAllOrder(req, res) {
    try {
        const order = await Order.find()
        res.json(order)
    } catch(err) {
        res.status(500).send("Server Error", err)
        console.log(err)
    }
}

export async function OrderStatus(req, res){
    const {orderId} = req.body
    const {status} = req.body

    try {
        const order = await Order.findById(orderId)
        if(!order) return res.status(404).json({msg: "Order not Found"})

        
    }catch(err) {
        console.log(err)
    }
}

export async function GetOrder(req, res) {
    try {
        const order = await Order.findById(res.params.id)
        if(!order) return
    }catch(err){
        
    }
    
}

export async function UpdateOrder(req, res) {
    const { userID, items, totalAmount} = req.body
    
}

export async function DeleteOrder(req, res) {
    const { userID, items, totalAmount} = req.body
    
}