// api/products/created-today.js
import dbConnect from '../../utils/dbConnect.js';  // Adjust path as needed
import Product from '../../models/Product.js';    // Product model

export default async function handler(req, res) {
  await dbConnect();  // Connect to MongoDB

  if (req.method === 'GET') {
    try {
        // Fetch products from the database
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
    
        const endOfDay = new Date();
        endOfDay.setHours(23,59,59,999);
    
        const products = await Product.find({
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        });
    
        // Send the products in the response
        res.status(200).json(products);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error. Unable to fetch products Created Today.' });
      }  } 
else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
