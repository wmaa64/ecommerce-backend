// api/products.js
import dbConnect from '../../utils/dbConnect.js' ;  // Ensure proper path
import Product from '../../models/Product.js';

export default async function handler(req, res) {
  await dbConnect();  // Ensure MongoDB is connected

  if (req.method === 'GET') {
    try {
        // Fetch product from the database
        const product = await Product.findById(req.params.id);
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        // Handle any errors
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error. Unable to fetch product.' });
      }
 } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
