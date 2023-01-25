import express from 'express'
import * as categoryController from '../controllers/categoryController.js'

const router = express.Router()

// @desc    fetch all products
// @route   GET /api/products
// @access  public
router.post('/', categoryController.createCategory)

// @desc    fetch single product
// @route   GET /api/products/:id
// @access  public
// router.get('/:id', productController.getProductById)

// router.post('/product', productController.createProduct)

export default router
