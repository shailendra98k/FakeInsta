const mongoose = require('../config/mongoose');
const {Schema} = mongoose;

const Post = new Schema({

    description: {
        type: String
    },
    user: {
         type: Schema.Types.ObjectId, ref: 'User'  
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