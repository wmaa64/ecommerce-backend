import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
    name: {type: String, require: true, trim: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true},
    description: { type: String, trim: true }
});

const Subcategory = mongoose.model('subcategory', SubcategorySchema);

export default Subcategory ;