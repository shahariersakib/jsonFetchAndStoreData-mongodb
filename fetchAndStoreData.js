const axios = require('axios');
const { MongoClient } = require('mongodb');

// Replace with your actual API URL and MongoDB connection string
const apiUrl = 'your_api_url';
const mongoConnectionString = 'your_connection_string';

// Replace with your MongoDB database and collection names
const dbName = 'db_name';
const collectionName = 'db_name';

async function fetchDataAndStore() {
    try {
        // Fetch data from the JSON API
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Connect to MongoDB
        const client = new MongoClient(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert data into MongoDB
        await collection.insertMany(data);

        console.log('Data successfully fetched and stored in MongoDB.');

        // Close MongoDB connection
        client.close();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the function
fetchDataAndStore();
