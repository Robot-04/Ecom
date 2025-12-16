import { Product } from "../Models/ProducModel.js"

const JWT_SECRET = process.env.JWT_SECRET

export async function CreateProduct(req, res) {
    const {name, description, price, category, stock} = req.body;
    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock
        })
        await newProduct.save()
        res.status(201).json(newProduct)
    }
    catch(err) {
        res.status(500).send("Server error", err)
        console.log(err)
    }
}

export async function GetAllProdcut(req, res) {
    try {
        const product = await Product.find()
        res.json(product)
    } catch(err) {
        res.status(500).send("Server error", err)
        console.log(err)
    }
}
export async function GetProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({msg: "Product not found"})
        res.json(product)
    }catch(err) {
        res.status(500).send("Server error", err)
        console.log(err)
    }
}
export async function UpdateProduct(req, res) {
    const {name, description, price, category, stock} = req.body
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {name, description, price, category, stock},
            { new: true}
        )
        if(!updateProduct) return res.status(404).json({msg: "Product not found"})
        res.json(200).json(updateProduct)
    } catch(err) {
        res.status(500).send("Server error", err)
    }
}
export async function DeleteProduct(req, res) {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        if(!deleteProduct) return res.status(404).json({msg: "Product not found"})
        res.json(200).json(DeleteProduct)
    } catch(err) {
        res.status(500).send("Server error", err)
    }
}