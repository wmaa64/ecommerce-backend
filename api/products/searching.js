// api/products.js
import dbConnect from '../../utils/dbConnect.js' ;  // Ensure proper path
import Product from '../../models/Product.js';
import allowCors from '../../utils/allowCors.js';

const handler = async (req, res) => {
  await dbConnect();  // Ensure MongoDB is connected

  if (req.method === 'GET') {
    const { query } = req.query;  // Get the search query from request parameters
      
      try {
        // Use MongoDB's text search or regex search for partial matches
        const products = await Product.find({
          $or: [
            {name: { $regex: query, $options: 'i' }},          // Search in name
            {category: { $regex: query, $options: 'i' }},
            {description: { $regex: query, $options: 'i' }}
          ]
             
        });
    
        // Send the products in the response
        res.status(200).json(products);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error. Unable to fetch products.' });
      }
    } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default allowCors(handler);