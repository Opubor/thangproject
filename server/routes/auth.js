var express = require('express');
var router = express.Router();
const { Staffs } = require('../models/staffs');
const jwt = require('jsonwebtoken')
const createHttpError = require("http-errors");
// const {loginValidator} = require('../validators/validators')

router.post('/login', async function(req,res,next){
    try {
        const {email, password} = req.body
        // const {error} =  loginValidator.validate({email,password})
        // if (error) throw new createHttpError.BadRequest(error.details[0].message);
        // ============================================
        const user = await Staffs.findOne({email})
        if(!user || (user.password !== password)){
            return res.status(401).send("Invalid Credentials")
        }else{
            const{_id,name, email, company, password, uniqueid, profilepic} = user
            jwt.sign({_id,name, email, company, password, uniqueid, profilepic},process.env.JWT_SECRET, {
                expiresIn: '365d'
            }, function(err, token){
                if(err){
                    return res.status(403).send("Error decoding token")
                }else{
                    return res.json(token)
                }
            })
        }
    } catch (error) {
       return res.status(401).send(error.message)
    }
})

module.exports = router