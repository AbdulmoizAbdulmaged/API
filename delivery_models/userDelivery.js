const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name : {type : String,required:true,},
    type : {type : String, default : "customer"},
    email : {type : String, required : true , unique : true},
    password : { type : String, required : true},
    
  },
  {timestamps: true}
);