const mongoose = require('mongoose'); 

const ownerSchema = mongoose.Schema({
    fullname: {
        type:String,
        minLength:3,
        trim: true
    },
    email:String,
    Password:String,
    product:{
        type:Array,
        default:[],
    },
    picture:String,
    gstin:String

});

module.exports = mongoose.model("owner", ownerSchema)