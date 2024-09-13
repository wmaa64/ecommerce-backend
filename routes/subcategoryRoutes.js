import express from 'express';
import { getSubCategories, createSubcategory,updateSubcategory, deleteSubcategory } from '../controllers/subcategoryController.js';
const router = express.Router();

// '/' means '/api/subcategories
router.get('/', getSubCategories);
router.post('/', createSubcategory);
router.delete('/:id', deleteSubcategory);
router.put('/:id', updateSubcategory);
 
export default router;
