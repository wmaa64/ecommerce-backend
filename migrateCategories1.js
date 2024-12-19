import { MongoClient } from 'mongodb';

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://mongo:mongo@cluster0.wbgy4px.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Replace with your database and collection names
    const database = client.db('ecommerce');
    const collection = database.collection('categories'); // Assuming you want to update 'categories'

    // Update all documents to add 'name' and 'description' fields, and remove 'tempName' and 'tempDescription'
    const updateResult = await collection.updateMany(
      {}, // Empty filter object to update all documents
      [
        {
          $set: {
            name: {
              en: "$tempName",
              ar: "$tempName"
            },
            description: {
              en: "$tempName",
              ar: "$tempName"
            }
          }
        },
        {
          $unset: ["tempName", "tempDescription"]
        }
      ]
    );

    // Output the result
    console.log('Update Result:', updateResult);
  } catch (error) {
    console.error('Error running the update:', error);
  } finally {
    // Close the connection to the database
    await client.close();
  }
}

run();
