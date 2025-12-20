import express from 'express'
import { CreateOrder, GetAllOrder, GetOrder, UpdateOrder } from '../Controllers/orderController'


const router = express.Router()

router.post('/:userId', CreateOrder)
router.get('/:userId', GetAllOrder)
router.get('/:userId/:orderId', GetOrder)
router.put('/:orderId/status', UpdateOrder)
router.delete('/:userId/:orderId', CreateOrder)

export default router