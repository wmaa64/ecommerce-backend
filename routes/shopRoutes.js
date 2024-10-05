import express from 'express';
import { getShopsForUser, getShops,createShop,updateShop, deleteShop } from '../controllers/shopController.js';
const router = express.Router();

// '/' means '/api/shops
router.get('/', getShops);
router.get('/:userId', getShopsForUser );
router.post('/', createShop);
router.delete('/:id', deleteShop);
router.put('/:id', updateShop);
 
export default router;
