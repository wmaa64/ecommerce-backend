import dbConnect from '../../utils/dbConnect.js';
import Category from '../../models/Category.js';
import Subcategory from '../../models/Subcategory.js';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
        // Fetch all categories
        const categories = await Category.find();
   
        // Fetch all subcategories
        const subcategories = await Subcategory.find();
    
        // Format the response
        const data = categories.map(category => {
          const subcats = subcategories.filter(sub => sub.categoryId.toString() === category._id.toString());
          return {
            ...category.toObject(),
            subcategories: subcats,
          };
        });
       
       
       // Send the categories in the response
       res.status(200).json(data);
     } catch (error) {
       // Handle any errors
       console.error('Error fetching categories with their subcategories:', error);
       res.status(500).json({ message: 'Server error. Unable to fetch catherogies with their subcategories.' });
     }
} else if (req.method === 'POST') {
    try {
        const newCategory = new Category(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
      } catch (err) {
        res.status(500).json(err);
      }
} else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
