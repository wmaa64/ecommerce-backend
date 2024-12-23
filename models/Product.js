import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      en: {type: String, require: true, trim: true },
      ar: {type: String, require: true, trim: true }
  },
  description: {
      en: { type: String, trim: true },
      ar: { type: String, trim: true }
  },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true},
  topselling: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
