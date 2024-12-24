//import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import { upload } from '../utils/cloudinaryConfig.js';

const getFeaturedProducts = async (req, res) => {
  try {
    // Fetch featured products (assuming there's a 'featured' field in the Product model)
    const products = await Product.find({ featured: true }).limit(5);
    
    // Send the products in the response
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch featured products.' });
  }
};

const getTopSellingProducts = async (req, res) => {
  try {
    // Fetch featured products (assuming there's a 'featured' field in the Product model)
    const products = await Product.find({ topselling: true }).limit(5);
    
    // Send the products in the response
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching Top Selling products:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch Top Selling products.' });
  }
};

const getProducts = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find().populate('categoryId', 'name.en')

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

const getProductsForUser = async (req, res) => {
  try {
    // Assuming the logged-in user ID is stored in req.user (from JWT or session middleware)
    const userId = req.params.userId;

    // Find products where the Shop's userId matches the logged-in userId
    const products = await Product.find()
      .populate({
        path: 'shopId',
        match: { userId: userId }, // Filter by the logged-in user's ID
        select: 'name userId' // Select only the shop name and userId
      });

    // Filter out products where the shopId wasn't matched (i.e., shopId.userId doesn't match userId)
    const filteredProducts = products.filter(product => product.shopId !== null);

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products for user', error });
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
  const { name, description, price, image, categoryId, topselling } = req.body;

  try {
    const newProduct = new Product({ name, description, price, image, categoryId, topselling });
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

const uploadProductImage = (req, res) => {
  // Use Multer's `upload.single('image')` inside the controller
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Image upload failed', error: err.message });
    }

    // If no error, the file is uploaded successfully, and we can access it
    try {
      // The uploaded image's URL will be available in req.file.path (from Cloudinary)
      const imageUrl = req.file.path;
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ message: 'Error handling image upload', error });
    }
  });
};

export { getProducts, getProductById, getProductsByQuery, getTodayProducts, getProductsForUser, 
         getSubCategoriesProducts, createProduct, updateProduct, deleteProduct, uploadProductImage, getFeaturedProducts,
         getTopSellingProducts };