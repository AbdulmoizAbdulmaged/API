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
}, 
{ timestamps: true });

module.exports = mongoose.model("DeliveryApp", DeliveryAppSchema);