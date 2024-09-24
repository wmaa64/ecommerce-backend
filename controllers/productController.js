//import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';


const getProducts = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find().populate('subcategoryId', 'name');;

    // Send the products in the response
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch products.' });
  }
};

const getTodayProducts = async (req, res) => {
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
  }
};

const getProductById = async (req, res) => {
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

};

const getProductsByQuery = async (req, res) => {
  const { query } = req.query;  // Get the search query from request parameters
console.log(query);
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
};


const getSubCategoriesProducts = async (req, res) => {
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
};
//-----------

// @route   POST /api/products
// @desc    Add a new product
// create a new Product
const createProduct =  async (req, res) => {
  const { name, price, image, brand, countInStock, description, subcategoryId } = req.body;

  try {
    const newProduct = new Product({ name, price, image, brand, countInStock, description, subcategoryId });
    const product = await newProduct.save();
    res.json(product);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Update a category
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Delete a category
const deleteProduct =  async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};


export { getProducts, getProductById, getProductsByQuery, getTodayProducts, getSubCategoriesProducts, createProduct, updateProduct, deleteProduct };