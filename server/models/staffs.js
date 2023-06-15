const {Schema, default:mongoose} = require('mongoose')

const StaffSchema = new Schema({
    name: String,
    phonenumber: String,
    email: String,
    role: String,
    uniqueid: String,
    address: String,
    profilepic: String,
    password: String,
    company: String,
})

async function getStaff(id){
    return await Staffs.findOne({_id:id})
}

const Staffs = mongoose.model('Staffs', StaffSchema)
module.exports = {Staffs, getStaff}