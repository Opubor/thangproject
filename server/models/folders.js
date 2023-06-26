const {Schema, default:mongoose} = require('mongoose')

const FoldersSchema = new Schema({
    foldername: String,
    testtables: [{type: Schema.Types.ObjectId, ref: 'TestCaseTable'}],
})

const Folders = mongoose.model('Folders', FoldersSchema)
module.exports = Folders