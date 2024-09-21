import express from 'express';
import { getProducts, getProductById , getProductsByQuery, getTodayProducts, getSubCategoriesProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
const router = express.Router();

// '/' means '/api/products
router.get('/', getProducts);
router.post('/', createProduct);

router.get('/searching', getProductsByQuery)
router.get('/created-today', getTodayProducts)
router.get('/subcategories-products',getSubCategoriesProducts)

router.get('/:id', getProductById); 
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
