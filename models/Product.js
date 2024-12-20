import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', require: true},
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', require: true},
    featured: { type: Boolean, default: false }  // Add the featured field,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
