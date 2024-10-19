import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const placeOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    // Validate that user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate that each product exists
    for (const item of products) {
      const product = await Product.findById(item.productId._id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId._id} not found` });
      }
    }

    const newOrder = new Order({
      user: userId,
      products: products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};

export  { placeOrder };