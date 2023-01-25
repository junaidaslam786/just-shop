import express from 'express'
import * as orderController from '../controllers/orderController.js'

const router = express.Router()

// @desc    create new order
// @route   POST /api/products
// @access  private
router.route('/').post(orderController.addOrderItems)

export default router
