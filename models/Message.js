const mongoose = require('mongoose');

const MessageSchema= new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const Message = mongoose.model('Message',MessageSchema);

module.exports=Message;