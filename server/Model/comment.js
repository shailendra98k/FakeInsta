const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema ({
  
    description:{
        type: String,
        required: true
    },
    user:{
        type:Object
    },
    post:{
        type:Object
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

}, {timestamps:true});
module.exports=mongoose.model('Comment', Comment);