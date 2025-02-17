import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subcategoryRoutes from './routes/subcategoryRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import basketRoutes from './routes/basketRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymobRoutes from './routes/paymobRoutes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

//Routes 
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories',categoryRoutes );
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/shops' , shopRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymobRoutes);


const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI).then(() => {
    console.log('Database is Connected');
}).catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
