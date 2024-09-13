import Subcategory from '../models/Subcategory.js';

const getSubCategories = async (req, res) => {
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
};

// Create a new category
const createSubcategory = async (req, res) => {
  try {
    const newSubcategory = new Subcategory(req.body);
    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a category
const updateSubcategory = async (req, res) => {
  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSubcategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a category
const deleteSubcategory =  async (req, res) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.id);
    res.status(200).json('Subcategory has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getSubCategories,createSubcategory,updateSubcategory, deleteSubcategory };