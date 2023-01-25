import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
});

// const createCategory = asyncHandler(async (req, res) => {
//   const category = new Category({
//     user: req.user._id,
//     name: 'Sample name',
//   });

//   const createdCategory = await category.save();
//   res.status(201).json(createdCategory);
// });

export { createCategory };
