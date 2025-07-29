const { verifyToken,verifyTokenAndAutherization,verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();


const FoodOrder = require('../models/foodOrder');

//Save a new order
router.post('/',async (req,res)=>{
  try{
      const newFoodOrder = new FoodOrder(req.body);

      const savedOrder = await newFoodOrder.save();

      res.status(200).json(savedOrder);

  }catch(err)
  {
     res.status(500).json(err);
  }
});

//update Order
router.put('/:id',async (req,res)=>{
  try{
     const updatedFoodOrder = await FoodOrder.findByIdAndUpdate(req.params.id,{
      $set: req.body
     },
     {new: true})

     res.status(200).json(updatedFoodOrder);
     return; // Prevents further execution
  }catch(err)
  {
    res.status(500).json(err);
    return; // Prevents further execution
  }
});

//Delete Order
router.delete('/:id',async (req,res)=>{
  try{

    await FoodOrder.findByIdAndDelete(req.params.id);
    res.status(200).json('Order has been deleted');
  }catch(err)
  {
    res.status(500).json(err);
  }
});



//GET Order
router.get('/find/:userId',async (req,res)=>{

  try{
       const getFoodOrders = await FoodOrder.find({userId: req.params.userId,status: { $ne: 'closed' }});
       res.status(200).json(getFoodOrders);
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//GET Order by delivery boy phone and status is out
router.get('/delivery/:phone',async (req,res)=>{
  try{
       const getFoodOrders = await FoodOrder.find({deliveryBoyPhone: req.params.phone,status: 'out'});
       res.status(200).json(getFoodOrders);
  }catch(err)
  {
    res.status(500).json(err);
  }
});


//GET ALL Orders
router.get('/',verifyTokenAndAdmin,async (req,res)=>{
  try{
        const getAllOrders = await FoodOrder.find();
        res.status(200).json(getAllOrders);
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//Get the all orders orders by depend on the status new, preparing, out,  make and sort by createdAt and order by descending and make the new orders first the preparing orders second and the out orders third.

//Get all orders sorted by status and createdAt
router.get('/sorted', verifyTokenAndAdmin, async (req, res) => {
  try {
    const sortedOrders = await FoodOrder.aggregate([
      {
        $addFields: {
          statusOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$status", "new"] }, then: 1 },
                { case: { $eq: ["$status", "preparing"] }, then: 2 },
                { case: { $eq: ["$status", "out"] }, then: 3 },
                
              ],
              default: 5
            }
          }
        }
      },
      { $sort: { statusOrder: 1, createdAt: -1 } } // Sort by statusOrder (ascending) and createdAt (descending)
    ]);

    res.status(200).json(sortedOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});



//GET last 10 Orders
router.get('/lastorders',verifyTokenAndAdmin,async (req,res)=>{
  try{
        const getAllOrders = await FoodOrder.find().limit(10);
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
     

       const income = await FoodOrder.aggregate([
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

//Get Monthly income by year
router.get('/income/:year',verifyTokenAndAdmin,async(req,res)=>{
  const year = req.params.year;
  try{
    const income = await FoodOrder.aggregate([
      {$match: {createdAt:{$gte: new Date(`${year}-01-01`),$lt: new Date(`${year}-12-31`)}}},
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
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//Get Monthly income by year and month
router.get('/income/:year/:month',verifyTokenAndAdmin,async(req,res)=>{
  const year = req.params.year;
  const month = req.params.month;
  try{
    const income = await FoodOrder.aggregate([
      {$match: {createdAt:{$gte: new Date(`${year}-${month}-01`),$lt: new Date(`${year}-${month}-31`)}}},
      {
        $project:{
          day:{$dayOfMonth:"$createdAt"},
          sales: "$amount"
        }

      },
      {
        $group:{
          _id: "$day",
          "total": {$sum: "$sales"}
        }
      }
    ]);
    res.status(200).json(income);
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//Get Monthly income by year and month and day
router.get('/income/:year/:month/:day',verifyTokenAndAdmin,async(req,res)=>{
  const year = req.params.year;
  const month = req.params.month;
  const day = req.params.day;
  try{
    const income = await FoodOrder.aggregate([
      {$match: {createdAt:{$gte: new Date(`${year}-${month}-${day}`),$lt: new Date(`${year}-${month}-${day}`)}}},
      {
        $project:{
          hour:{$hour:"$createdAt"},
          sales: "$amount"
        }

      },
      {
        $group:{
          _id: "$hour",
          "total": {$sum: "$sales"}
        }
      }
    ]);
    res.status(200).json(income);
  }catch(err)
  {
    res.status(500).json(err);
  }
});
//Get Monthly income by year and month and day and hour
router.get('/income/:year/:month/:day/:hour',verifyTokenAndAdmin,async(req,res)=>{
  const year = req.params.year;
  const month = req.params.month;
  const day = req.params.day;
  const hour = req.params.hour;
  try{
    const income = await FoodOrder.aggregate([
      {$match: {createdAt:{$gte: new Date(`${year}-${month}-${day}T${hour}:00:00`),$lt: new Date(`${year}-${month}-${day}T${hour}:59:59`)}}},
      {
        $project:{
          minute:{$minute:"$createdAt"},
          sales: "$amount"
        }

      },
      {
        $group:{
          _id: "$minute",
          "total": {$sum: "$sales"}
        }
      }
    ]);
    res.status(200).json(income);
  }catch(err)
  {
    res.status(500).json(err);
  }
});

//Get order by transaction id
router.get('/transaction/:transactionId',async(req,res)=>{
  const transactionId = req.params.transactionId;
  try{
    const order = await FoodOrder.findOne({transaction: transactionId});
    res.status(200).json(order);
  }catch(err)
  {
    res.status(500).json(err);
  }
});






module.exports = router;