import express from 'express'

import {
    CreateProduct,
    GetAllProdcut,
    GetProduct,
    UpdateProduct,
    DeleteProduct
} from '../Controllers/ProductController.js'

const router = express.Router()

router.post('/create', CreateProduct)
router.get('/', GetAllProdcut)
router.get('/:id', GetProduct)
router.put('/:id', UpdateProduct)
router.delete('/:id', DeleteProduct)

export default router