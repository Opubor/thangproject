const {Schema, default:mongoose} = require('mongoose')

const TestCaseSchema = new Schema({
    testcasetable: String,
    priority: String,
    title: String,
    teststep: String,
    precondition: String,
    description: String,
    category: String,
    statuscase: String,
    version: String,
    results: String,
    expectations: String,
    date: String,
})

const TestCase = mongoose.model('TestCase', TestCaseSchema)
module.exports = TestCase