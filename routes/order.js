const { verifyToken,verifyTokenAndAutherization,verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

const Order = require('../models/order');

//Save a new order
router.post('/',verifyToken,async (req,res)=>{
  try{
      const newOrder = new Order(req.body);

      const savedOrder = await newOrder.save();

      res.status(200).json(savedOrder);

  }catch(err)
  {
     res.status(500).json(err);
  }
});

//update Order
router.put('/:id',verifyToken,async (req,res)=>{
  try{
     const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
      $set: req.body
     },
     {new: true})

     res.status(200).json(updatedOrder);
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//Delete Order
router.delete('/:id',verifyTokenAndAdmin,async (req,res)=>{
  try{

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order has been deleted');
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//GET Order
router.get('/find/:userId',verifyToken,async (req,res)=>{

  try{
       const getOrders = await Order.find({userId: req.params.userId,status: { $ne: 'canceled' }});
       res.status(200).json(getOrders);
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//GET ALL Orders
router.get('/',verifyTokenAndAdmin,async (req,res)=>{
  try{
        const getAllOrders = await Order.find();
        res.status(200).json(getAllOrders);
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//GET last 10 Orders
router.get('/lastorders',verifyTokenAndAdmin,async (req,res)=>{
  try{
        const getAllOrders = await Order.find().limit(10);
        res.status(200).json(getAllOrders);
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//Get Monthly income
router.get('/income',verifyTokenAndAdmin,async(req,res)=>{
  const productId = req.query.pid
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() -1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    try{
     

       const income = await Order.aggregate([
        {$match: {createdAt:{$gte: previousMonth}, ...(productId && 
        {/*  */products: {$elemMatch: {productId}}})
        }},
        {
          $project:{
            month:{$month:"$createdAt"},
            sales: "$amount"
          }

        },
        {
          $group:{
            _id: "$month",
            "total": {$sum: "$sales"}
          }
        }
       
     

      ]);
     res.status(200).json(income);
}
  catch(err)
  {
    res.status(500).json(err);
  }

}
)




module.exports = router;