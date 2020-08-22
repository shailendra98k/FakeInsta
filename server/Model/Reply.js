const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const Reply = new Schema ({
  
    description:{
        type: String,
        required: true
    },
    comment:{
         type:ObjectId,
         ref:"Reply" 
    },
    user:{
        type:ObjectId,
        ref:"User"
    },
    likes:{
        type:Array,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

}, {timestamps:true});
module.exports=mongoose.model('Reply', Reply);