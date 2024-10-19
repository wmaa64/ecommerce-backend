// routes/basketRoutes.js
import express from 'express';
import { addToBasket, getBasket, removeFromBasket, deleteUserBasket } from '../controllers/basketController.js';

const router = express.Router();

router.post('/add', addToBasket);
router.get('/:userId', getBasket);
router.post('/remove', removeFromBasket);
router.delete('/:userId', deleteUserBasket);


export default router;
