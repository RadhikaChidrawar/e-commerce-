const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    fullname: String,
    email:String,
    Password:String,
    cart:{
        type: Array,
        default:[],
    },
    isadmin:Boolean,
    order:{
        type:Array,
        default:[],
    },
    contact : Number,
    picture:String
});

module.exports = mongoose.model("user", userSchema)