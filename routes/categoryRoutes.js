import express from 'express';
import { getCategoryWithSubCategory, createCategory,updateCategory, deleteCategory } from '../controllers/categoryController.js';
const router = express.Router();

// '/' means '/api/categories
router.get('/', getCategoryWithSubCategory);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);
 
export default router;
