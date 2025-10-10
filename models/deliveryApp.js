const mongoose = require('mongoose');
const DeliveryAppSchema = new mongoose.Schema({
 
  
  
  name: {type: String,},
  icon: {type: String, default: ''},
  version: {type: String,},
  logo: {type: String, default: ''},
  start: {type: String, default: '08:00 AM'},
  end: {type: String, default: '10:00 PM'},
  active: { type: Boolean, default: true },
  ads: { type: String, default: '' },
  max_distance: {type:Number, default: 5000}, // in meters
  min_order_price: {type:Number, default: 5000},
  max_cash_value: {type:Number,default: 10000},
  bank_account_number: {type:String, default:''},
  facebook: {type:String, default:''},
  instagram: {type:String, default:''},
  twitter: {type:String, default:''},
  tiktok: {type:String, default:''},
  youtube: {type:String, default:''},
  whatsapp: {type:String, default:''},
  phone: {type:String, default:''},
  email: {type:String, default:''},
  address: {type:String, default:''},
  
}, 
{ timestamps: true });

module.exports = mongoose.model("DeliveryApp", DeliveryAppSchema);