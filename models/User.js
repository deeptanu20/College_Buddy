const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  branch:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:['student','admin'],
    default:'student'
  }
})

const User = mongoose.model('User',UserSchema);
module.exports=User;