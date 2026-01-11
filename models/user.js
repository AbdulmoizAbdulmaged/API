const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
  {
    username : {type : String,},
    email : {type : String },
    password : { type : String,default : '123'},
    phone : {type : String,required : true,unique : true},
    address : {type : String},
    isAdmin : {type: Boolean,default: false},
    img : {type: String},
    wish : {type:Array,default:[]},
    type: {type: String, default: 'user'},//user,admin,delivery,cashier
    isBlocked : {type: Boolean,default: false},
  },
  {timestamps: true}
);

module.exports = mongoose.model("User",UserSchema);