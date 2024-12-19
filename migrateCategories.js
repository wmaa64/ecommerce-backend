import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js'; // Import your Category model
import Subcategory from './models/Subcategory.js'; // Import your Subcategory model

dotenv.config();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI).then(() => {
    console.log('Database is Connected');
}).catch(err => console.log(err));

// Connect to your MongoDB database
/*
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/

const migrateCategories = async () => {
    try {
      // Step 1: Rename existing fields to temporary placeholders
      await Category.updateMany({}, { 
        $rename: { 'name': 'tempName', 'description': 'tempDescription' }
      });
      
      await Subcategory.updateMany({}, { 
        $rename: { 'name': 'tempName', 'description': 'tempDescription' }
      });
  
      // Step 2: Migrate the temporary fields to the new structure
      const categories = await Category.find();
      for (const category of categories) {
        await Category.updateOne(
          { _id: category._id },
          {
            $set: {
              'name.en': category.tempName,          // Move tempName to name.en
              'name.ar': category.tempName,          // Copy tempName to name.ar as default
              'description.en': category.tempDescription || '', // Move tempDescription to description.en
              'description.ar': category.tempDescription || ''  // Copy tempDescription to description.ar as default
            },
            $unset: {
              tempName: '',        // Remove the temporary name field
              tempDescription: ''  // Remove the temporary description field
            }
          }
        );
      }
  
      const subcategories = await Subcategory.find();
      for (const subcategory of subcategories) {
        await Subcategory.updateOne(
          { _id: subcategory._id },
          {
            $set: {
              'name.en': subcategory.tempName,          // Move tempName to name.en
              'name.ar': subcategory.tempName,          // Copy tempName to name.ar as default
              'description.en': subcategory.tempDescription || '', // Move tempDescription to description.en
              'description.ar': subcategory.tempDescription || ''  // Copy tempDescription to description.ar as default
            },
            $unset: {
              tempName: '',        // Remove the temporary name field
              tempDescription: ''  // Remove the temporary description field
            }
          }
        );
      }
  
      console.log('Migration completed successfully!');
      mongoose.connection.close();
    } catch (error) {
      console.error('Error during migration:', error);
      mongoose.connection.close();
    }
  };
  
migrateCategories();
