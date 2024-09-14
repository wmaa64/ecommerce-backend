import dbConnect from '../../utils/dbConnect.js';
import Subcategory from '../../models/Subcategory.js'

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch subcategories from the database
      const subcategories = await Subcategory.find().populate('categoryId', 'name');;
  
      // Send the subcategories in the response
      res.status(200).json(subcategories);
    } catch (error) {
      // Handle any errors
      console.error('Error fetching subcategories:', error);
      res.status(500).json({ message: 'Server error. Unable to fetch subcategories.' });
    }
  } else if (req.method === 'POST') {
    try {
      const newSubcategory = new Subcategory(req.body);
      const savedSubcategory = await newSubcategory.save();
      res.status(201).json(savedSubcategory);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
