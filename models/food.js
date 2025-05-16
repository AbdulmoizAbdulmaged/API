const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema(
  {
    barcode: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    desc: {type: String,required: true},
    img: {type: String,required: true},
    season: {type: String, default: 'none'},
    categories: {type: Array},
    size: {type: Array},
    color: {type: Array},
    selectedColor:{type: String, default:'none'},
    selectedSize:{type: String, default:'none'},
    price: {type: Number, required: true},
    inStock: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    type: {type: String, default: 'food'}
    
    
},
{timestamps: true}
);

module.exports = mongoose.model("Food",FoodSchema);