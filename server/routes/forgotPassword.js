var express = require('express');
var router = express.Router();
const { Staffs } = require('../models/staffs');
const jwt = require('jsonwebtoken')
const createHttpError = require("http-errors");
var nodemailer = require('nodemailer');
const { forgotPasswordValidator, resetPasswordValidator} = require('../validators/validators')

// FORGOT-PASSWORD : FORGOT-PASSWORD : FORGOT-PASSWORD : FORGOT-PASSWORD : FORGOT-PASSWORD
// CREATE_FORGOT-PASSWORD
router.post('/forgotpassword', async function(req,res,next){
    try {
       const {email} = req.body
    //    const {error} = forgotPasswordValidator.validate({email})
    //    if (error) throw new createHttpError.BadRequest(error.details[0].message);
       const oldUser = await Staffs.find({email})
       if(!oldUser){
           return res.send("User does not exist")
       }
       const secret = process.env.JWT_SECRET + oldUser.password
       const token = jwt.sign({email: oldUser[0].email, id: oldUser[0]._id}, secret, {expiresIn: "30m"})
       const link = `${process.env.WEB_URL}/resetpassword?resu=${oldUser[0]._id}&nekot=${token}`;
       var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'opubortony@gmail.com',
          pass: 'iylcmdquqdgdbcnk'
        }
      });
      
      var mailOptions = {
        from: 'opubortony@gmail.com',
        to: oldUser[0]?.email,
        subject: 'Password Reset',
        text: link
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    return res.status(200).send('Email sent')
    } catch (error) {
       return res.status(401).send("E-mail does not exist")
    }
})

// GET USER VERIFICATION DETAILS
router.get('/reset-password', async function(req,res,next){
    try {
       const {id, token} = req.query
        const oldUser = await Staffs.find({_id: id})
        if(!oldUser){
            return res.send("User does not exist")
        }
        const secret = process.env.JWT_SECRET + oldUser.password
        const verify = jwt.verify(token,secret)
        return res.json(verify)
    } catch (error) {
       return res.status(401).send("Not Verified")
    }
})

// POST NEW PASSWORD
router.post('/reset-password', async function(req,res,next){
    try {
       const {id, token} = req.query
       const {password} = req.body
       const {error} = resetPasswordValidator.validate({password})
       if (error) throw new createHttpError.BadRequest(error.details[0].message);
        const oldUser = await Staffs.find({_id: id})
        if(!oldUser){
            return res.send("User does not exist")
        }
        const secret = process.env.JWT_SECRET + oldUser.password
        const verify = jwt.verify(token,secret)

        await Staffs.findByIdAndUpdate(id,{password})
        return res.status(200).send('Password updated successfully')
    } catch (error) {
       return res.status(401).send("Not Verified")
    }
})


module.exports = router