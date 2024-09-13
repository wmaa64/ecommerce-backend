//import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';


const getProducts = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find();

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


export { getProducts, getProductById, getProductsByQuery, getTodayProducts, getSubCategoriesProducts };