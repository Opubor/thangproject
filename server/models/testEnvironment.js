const {Schema, default:mongoose} = require('mongoose')

const TestEnvironmentSchema = new Schema({
    operatingsystem: String,
    description: String,
    browser: String,
})

const TestEnvironment = mongoose.model('TestEnvironment', TestEnvironmentSchema)
module.exports = TestEnvironment