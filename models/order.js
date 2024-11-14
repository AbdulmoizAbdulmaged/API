const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

  userId : {type: String, required: true},
  phone : {type: String, required: true},
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
  status: {type: String, default: "pending"},
  payment: {type: String},
  paymentStatus: {type: String},
  
},
{timestamps: true}
);

module.exports = mongoose.model('Order',OrderSchema);