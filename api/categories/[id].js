import dbConnect from '../../utils/dbConnect.js';
import Category from '../../models/Category.js';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;  // Get the category ID from the URL parameter

  if (req.method === 'PUT') {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedCategory);
      } catch (err) {
        res.status(500).json(err);
      }
 } else if (req.method === 'DELETE') {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json('Category has been deleted...');
      } catch (err) {
        res.status(500).json(err);
      }
} else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
