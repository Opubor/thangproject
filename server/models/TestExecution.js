const {Schema, default:mongoose} = require('mongoose')

const TestExecutionSchema = new Schema({
    falsetest: String,
    pass: String,
    cancel: String,
    block: String,
    blank: String,
})

const TestExecution = mongoose.model('TestExecution', TestExecutionSchema)
module.exports = TestExecution