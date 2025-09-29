const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("hey it's working...");
});
router.post('/register',async(req,res)=>{
    console.log('BODY RECEIVED:', req.body); // debugging
    try{
        let{ email, fullname, password }= req.body
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async(err,hash)=>{
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        fullname,
                        password: hash
                    })
                // res.send(user);
                let token = jwt.sign( {email, id: user._id},"hehehe",)// {expiresIn: '24h'})- option to keep token present in system
                res.cookie("token", token)
                res.send("user created successfully.......!")
                }
             })
        })
    } catch(err){
        console.log(err.message);
    }
})


module.exports = router;
