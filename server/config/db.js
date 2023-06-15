const mongoose = require ('mongoose')

async function connectDB(){
    try {
        // Add your database URL here EXAMPLE
        return await mongoose.connect('mongodb://localhost:27017/thangmanagement')
    } catch{
        console.log('Database Connection Error')
    }
}

module.exports = connectDB