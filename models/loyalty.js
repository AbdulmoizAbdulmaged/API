const moongose = require('mongoose');

const LoyaltySchema = new moongose.Schema({
  userId: { type: String,},
  points: { type: Number, default: 0 },
  discount:{ type: Number, default: 0 },
  transactions: {type:Number, default: 0},
  //make validtion period 3 month from now
  // if the user has not made a transaction in 3 months, the points will be reset to 0
 validationPeriod: { type: Date, default: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) },
  
}, 
{ timestamps: true });

module.exports = moongose.model("Loyalty", LoyaltySchema);