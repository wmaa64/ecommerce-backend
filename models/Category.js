import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {type: String, require: true, trim: true },
    description: { type: String, trim: true }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category ;