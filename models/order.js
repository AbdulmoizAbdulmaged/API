const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

  userId : {type: String, required: true},
  phone : {type: String, required: true},
  deliveryBoyEmail : {type: String,default: "none"},
  deliveryBoyPhone : {type: String,default: "none"},
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
  address: {type: Object},
  longitude: {type: String,default: null},
  latitude: {type: String,default: null},
  status: {type: String, default: "open"},
  payment: {type: String},
  paymentStatus: {type: String,default: "pending"},
  deliveryStatus: {type: String,default: "pending"},
  
},
{timestamps: true}
);

module.exports = mongoose.model('Order',OrderSchema);