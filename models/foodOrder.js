const mongoose = require('mongoose');

const FoodOrderSchema = new mongoose.Schema({

  userId : {type: String, required: true},
  phone : {type: String, required: true},
  deliveryBoyName : {type: String,default: ""},
  deliveryBoyPhone : {type: String,default: ""},
  deliveryBoyComment : {type: String,default: ""},
  products: [
    {
     productId: {type: String},
     title: {type:String},
     price: {type:Number},
     img: {type: String},
     size: {type: Array},
     color: {type: Array},
     quantity: {type: Number, default: 1}
  } 
  ],
  amount: {type: Number,required: true},
  discount:{type:Number,default: 0},
  address: {type: Object},
  longitude: {type: String,default: null},
  latitude: {type: String,default: null},
  distance: {type: String,default: null},
  approximateTime: {type: String,default: null},
  status: {type: String, default: "new"},//new, preparing, out, delivered, cancelled, fraud
  payment: {type: String},
  transaction: {type: String},
  attachment:{type: String,default: null},
  receipt: {type: String,default: null},
  comment: {type: String,default: null},
  paymentStatus: {type: String,default: "pending"},//pending,done
  deliveryStatus: {type: Boolean,default: false},
  
},
{timestamps: true}
);

module.exports = mongoose.model('FoodOrder',FoodOrderSchema);