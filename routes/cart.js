const { verifyTokenAndAutherization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken');
const Cart = require('../models/cart');

const router = require('express').Router();

//Create a Cart
router.post('/',verifyToken,async (req,res)=>{
  try
  {
    const newCart = new Cart(req.body);

    const savedCart = await newCart.save();

    res.status(200).json(savedCart);



  }catch(err){
    res.status(500).json(err);
  }
});

//update Cart
router.put('/:id',verifyTokenAndAutherization,async(req,res)=>{
  try
  {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
     $set: req.body
    },
    {new: true}
    );
    res.status(200).json(updatedCart);

  }catch(err)
  {
    res.status(500).json(err);
  }
});

//Delete
router.delete('/:id',verifyTokenAndAutherization,async (req,res)=>{
  try{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart has been deleted');
  }catch(err)
  {
    res.status(500).json(err);
  }
})

//GET Cart
router.get('/find/userId',verifyTokenAndAutherization,async (req,res)=>{
  try{
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json(cart);

  }catch(err){
    res.status(500).json(err);
  }
})

//Get All Carts
router.get('/',verifyTokenAndAdmin,async (req,res)=>{
  try{

    const getAllCarts = await Cart.find();
    res.status(200).json(getAllCarts);

  }catch(err)
  {
    res.status(500).json(err);
  }
})


module.exports = router;