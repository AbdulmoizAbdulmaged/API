const mongoose = require('mongoose');


const CustomerSchema = new mongoose.Schema(
  {
    name : {type : String,},
    phone : {type : String,required : true,},
    password : { type : String, required : true},
    email : {type : String },
    address : {type : String},
    point : {type: Number,default: 0},
    type : {type: String,default: "customer"},
    flag : {type: Boolean,default: false},
    numberofCancellation : {type: Number,default: 0},
  },
  {timestamps: true}
);

module.exports = mongoose.model("Customer",CustomerSchema);