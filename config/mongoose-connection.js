const mongoose = require('mongoose');

mongoose
.connect('mongodb://127.0.0.1:27017/e-comm')
.then(()=>{
    console.log("connection ... im ruuning ");
    
})
.catch((err)=>{
    console.log(err);
 })

 module.exports = mongoose.connection;