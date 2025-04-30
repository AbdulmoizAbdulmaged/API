const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({

  userId : {type: String, required: true},
  total: {type: Number, default: 0},
  products: [
    {
     productId: {type: String},
     title: {type: String},
     img: {type: String},
     price: {type: Number},
     quantity: {type: Number, default: 1}
  } 
  ]
},
{timestamps: true}
);

module.exports = mongoose.model('Cart',CartSchema);