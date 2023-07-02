const {Schema, default:mongoose} = require('mongoose')

const TestCaseSchema = new Schema({
    testcasetable: String,
    assignedfolderId: String,
    priority: String,
    title: String,
    teststep: String,
    precondition: String,
    description: String,
    category: String,
    results: String,
    status: String,
    expectations: String,
    assignedstaff: String,
    testtable: [{type: Schema.Types.ObjectId, ref: 'TestCaseTable'}],
})

const TestCase = mongoose.model('TestCase', TestCaseSchema)
module.exports = TestCase