import express from 'express';
import { initiatePaymobPayment } from '../controllers/paymobController.js';
const router = express.Router();

// '/' means '/api/payments
router.post('/paymob', initiatePaymobPayment);
 
export default router;
