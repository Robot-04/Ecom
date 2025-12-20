import { Order } from "../Models/OrderModels.js"

export async function CreateOrder(req, res) {
    const { userID } = req.params
    const {items, totalAmount} = req.body
    try {
        
        // const productAvilable = await Promise.all(
        //     items.map(async ())
        // )

        const productAvilable = async () => {
            items.map(async (item)=> {
                const product = await fetch()
            })
        }

        const newOrder = new Order({
            userID, items, totalAmount
        })
        await newOrder.save()
        res.saturs(201).json(newOrder)
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