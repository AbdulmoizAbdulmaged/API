const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
  {
    barcode: {type: String, required: true, unique: true},
    title: {type: String, required: true,unique: true},
    desc: {type: String,required: true},
    img: {type: String,required: true},
    season: {type: String, required: true},
    categories: {type: Array},
    size: {type: Array},
    color: {type: Array},
    selectedColor:{type: String, default:'none'},
    selectedSize:{type: String, default:'none'},
    price: {type: Number, required: true},
    inStock: {type: Number, required:true},
    discount: {type: Number, default: 0},
    
    
},
{timestamps: true}
);

module.exports = mongoose.model("Product",ProductSchema);