const { verifyTokenAndAutherization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken');
const Cart = require('../models/cart');

const router = require('express').Router();

//Create a Cart
router.post('/',async (req,res)=>{
  try
  {
    const newCart = new Cart(req.body);

    const savedCart = await newCart.save();

    res.status(200).json(newCart);



  }catch(err){
    res.status(500).json("Failed");
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
router.delete('/find/:userId/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({
      userId: req.params.userId,
      "products.productId": req.params.productId // Ensure product exists in cart
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item deleted successfully", deletedCart: cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET Cart
router.get('/find/:userId', async (req, res) => {
  try {
    //sort by createdAt in descending order
    const cart = await Cart.aggregate([
      { $match: { userId: req.params.userId } },
      { $unwind: "$products" },
      {
        $group: {
          _id: { userId: "$userId", productId: "$products.productId" },
          quantity: { $sum: "$products.quantity" },
          totalPrice: { $sum: { $multiply: ["$products.quantity", "$products.price"] } },
          products: { $first: "$products" }
        }
      },
      { $sort: { "_id.productId": 1 } }, // Sort by productId
      {
        $project: {
          _id: 0,
          userId: "$_id.userId",
          productId: "$_id.productId",
          quantity: 1,
          totalPrice: 1,
          products: 1
        }
      }
    ]);

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Carts
router.get('/',async (req,res)=>{
  try{

    const getAllCarts = await Cart.find().sort({createdAt: -1});
    res.status(200).json(getAllCarts);

  }catch(err)
  {
    res.status(500).json(err);
  }
})

//clear cart
router.delete('/remove/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.deleteMany({
      userId: userId,
     
    });

    if (!cart) {
      return res.status(404).json("failed");
    }

    res.status(200).json("success");
  } catch (err) {
    res.status(500).json("failed");
  }
});








module.exports = router;