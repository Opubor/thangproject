const {Schema, default:mongoose} = require('mongoose')

const FoldersSchema = new Schema({
    foldername: String,
})

const Folders = mongoose.model('Folders', FoldersSchema)
module.exports = Folders