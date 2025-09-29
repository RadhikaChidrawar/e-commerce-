const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  // console.log('BODY RECEIVED:', req.body); // debugging
  try {
    let { email, fullname, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user)
      return res.status(401).send("you already have account, please login");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            fullname,
            password: hash,
          });
          // res.send(user);
          // let token = jwt.sign( {email, id: user._id},"hehehe")// {expiresIn: '24h'})- option to keep token present in system
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user created successfully.......");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};


module.exports.loginUser = async function(req, res){
    let {email, password} = req.body;

    let user = await userModel.findOne({ email: email});
    if(!user) return res.send("email or password incorrect");

    bcrypt.compare(password, user.password, function(err, result){
      // res.send(result)
      // console.log(result);
      if(result){
        let token = generateToken(user)
        res.cookie("token", token)
        return res.send("you can login")
    } else {
        return res.send("email or password incorrect");
    }
  })
    
}