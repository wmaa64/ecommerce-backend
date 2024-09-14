// api/products.js
import dbConnect from '../../utils/dbConnect.js' ;  // Ensure proper path
import Product from '../../models/Product.js';

export default async function handler(req, res) {
  await dbConnect();  // Ensure MongoDB is connected

  if (req.method === 'GET') {
    try {
        // Extract subcategory IDs from query parameters
        const subcategoryIds = req.query.subcategoryIds.split(',');
  
        // Fetch products that match any of the subcategory IDs
        const products = await Product.find({ subcategoryId: { $in: subcategoryIds } });
    
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
