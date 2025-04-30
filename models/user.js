const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
  {
    username : {type : String,},
    email : {type : String },
    password : { type : String, required : true},
    phone : {type : String,required : true,unique : true},
    address : {type : String},
    isAdmin : {type: Boolean,default: false},
    img : {type: String},
    wish : {type:Array,default:[]},
  },
  {timestamps: true}
);

module.exports = mongoose.model("User",UserSchema);