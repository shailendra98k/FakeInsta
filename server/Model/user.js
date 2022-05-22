const mongoose = require('../config/mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    friends:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    }

}, {timestamps:true});

module.exports=mongoose.model('User', User);

