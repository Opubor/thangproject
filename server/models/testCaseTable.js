const {Schema, default:mongoose} = require('mongoose')

const TestCaseTableSchema = new Schema({
    tablename: String,
    description: String,
    attachments: String,
    date: String,
    precondition: String,
    version: String,
    assignedfolderId: String,
})

const TestCaseTable = mongoose.model('TestCaseTable', TestCaseTableSchema)
module.exports = TestCaseTable