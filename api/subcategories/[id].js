import dbConnect from '../../utils/dbConnect';
import Category from '../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;  // Get the category ID from the URL parameter

  if (req.method === 'PUT') {
    try {
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedSubcategory);
    } catch (err) {
      res.status(500).json(err);
    }
   } else if (req.method === 'DELETE') {
    try {
      await Subcategory.findByIdAndDelete(req.params.id);
      res.status(200).json('Subcategory has been deleted...');
    } catch (err) {
      res.status(500).json(err);
    }
  
} else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
