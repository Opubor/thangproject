// const mongoose = require('mongoose')
// const MongoClient = require('mongodb').MongoClient;

// async function connectDB() {

//     try {
//         const client = new MongoClient('mongodb://localhost:27017/');
//         // Add your database URL here EXAMPLE
//         // return 
//         await client.connect()
//         // Fetch all collection names
//         const database = client.db('thangmanagement');
//         const collections = await database.listCollections().toArray();
//         // Extract collection names from the result
//         const collectionNames = collections.map((collection) => collection.name);
//         console.log('Collections:', collectionNames);
//         console.log('Db connected successfully')
//     } catch (err) {
//         console.log('Database Connection Error: ', err);
//     }
// }

// module.exports = connectDB
const mongoose = require ('mongoose')

async function connectDB(){
    try {
        // Add your database URL here EXAMPLE
        return await mongoose.connect('mongodb://localhost:27017/thangmanagement')
    } catch (err) {
        console.log('Database Connection Error: ', err)
    }
}

module.exports = connectDB