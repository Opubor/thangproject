const {Schema, default:mongoose} = require('mongoose')

const StaffSchema = new Schema({
    name: String,
    email: String,
    uniqueid: String,
    profilepic: String,
    password: String,
    company: String,
})

async function getStaff(id){
    return await Staffs.findOne({_id:id})
}

const Staffs = mongoose.model('Staffs', StaffSchema)
module.exports = {Staffs, getStaff}