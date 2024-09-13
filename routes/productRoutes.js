import express from 'express';
import { getProducts, getProductById , getProductsByQuery, getTodayProducts, getSubCategoriesProducts } from '../controllers/productController.js';
const router = express.Router();

// '/' means '/api/products
router.get('/', getProducts);
router.get('/searching', getProductsByQuery)
router.get('/created-today', getTodayProducts)
router.get('/subcategories-products',getSubCategoriesProducts)
router.get('/:id', getProductById); 

export default router;
