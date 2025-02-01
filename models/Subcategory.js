import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
    name: {
        en: {type: String, require: true, trim: true },
        ar: {type: String, require: true, trim: true }
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true},
    description: {
        en: { type: String, trim: true },
        ar: { type: String, trim: true }
    }
});


const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

export default Subcategory ;