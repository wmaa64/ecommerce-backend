import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
const router = express.Router();

// '/' means '/api/orders
router.post('/', placeOrder);
 
export default router;