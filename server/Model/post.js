const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({

    description: {
        type: String
    },
    user: {
        type: Object
    },
    comments:{
          type:Array
    },
    photos:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });
module.exports = mongoose.model('Post', Post);