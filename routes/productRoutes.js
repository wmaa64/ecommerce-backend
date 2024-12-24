import express from 'express';
import { getProducts, getProductById , getProductsByQuery, getTodayProducts, getProductsForUser, getSubCategoriesProducts,
         createProduct, updateProduct, deleteProduct, uploadProductImage, getFeaturedProducts,
         getTopSellingProducts } from '../controllers/productController.js';

const router = express.Router();

// '/' means '/api/products
router.get('/', getProducts);
router.post('/', createProduct);

router.get('/featured', getFeaturedProducts);
router.get('/topselling', getTopSellingProducts);

router.get('/searching', getProductsByQuery)
router.get('/created-today', getTodayProducts)
router.get('/user-products/:userId',getProductsForUser);
router.get('/subcategories-products',getSubCategoriesProducts)
router.get('/:id', getProductById); 
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.post('/upload', uploadProductImage);


export default router;
