import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('category', 'name');
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = async (req, res) => {
  const {
    user,
    name,
    dosageForm,
    packSize,
    image,
    sku,
    category,
    price,
    countInStock,
  } = req.body;

  try {
    const product = new Product({
      user,
      name,
      dosageForm,
      packSize,
      image,
      sku,
      category,
      price,
      countInStock,
    });

    await product.save();
    return res
      .status(201)
      .json({ message: 'Product created successfully', product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { getProducts, getProductById, createProduct };
