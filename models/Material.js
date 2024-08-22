const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    branch:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Material = mongoose.model('Material',MaterialSchema);

module.exports=Material;