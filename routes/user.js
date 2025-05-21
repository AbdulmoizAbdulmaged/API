const router = require('express').Router();
const { verifyToken,verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verifyToken');
const Crypto = require('crypto');
const User = require('../models/user');
const Customer = require('../models/customer');
CryptoJS = require("crypto-js");

//update user
router.put('/:id',verifyTokenAndAutherization,async (req,res)=>{
 if(req.body.password){
  req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
 }



   try
   {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
      $set : req.body,
    },{new: true});
    
    res.status(200).json(updatedUser);
    return; // Prevents further execution

   }catch (err){
      res.status(500).json(err);
      return; // Prevents further execution
   }
})

//delete user
router.delete('/:id',verifyTokenAndAutherization,async (req,res)=>{
   try{
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
      return; // Prevents further execution
   }catch (err)
   {
      res.status(500).json(err);
      return; // Prevents further execution
   }
})

//find single user
router.get('/find/:id',verifyTokenAndAdmin,async (req,res)=>{
   try{

    const user = await User.findById(req.params.id);

    const {password,...others} = user._doc;

    res.status(200).json(others);
    return; // Prevents further execution
   }catch(err)
   {
      res.status(500).json(err);
      return; // Prevents further execution
   }
})

//get all users
router.get('/',verifyTokenAndAdmin,async (req,res)=>{
   const query = req.query.new;
   try{
      
      const users = query ? await User.find().sort({_id: -1}).limit(10) : await User.find();

      res.status(200).json(users);
      return; // Prevents further execution
   }catch(err)
   {
      res.status(500).json(err);
      return; // Prevents further execution
   }
})

//GET User stats
router.get('/stats',verifyTokenAndAdmin,async (req,res)=>{
   const date = new Date();
   const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

   try
   {
      const data = await User.aggregate([

         {$match: {createdAt: {$gte: lastYear}}},
         {
            $project:{
               month: {$month: "$createdAt"}
            },
         },
          {
            $group:{
               _id: "$month",
               total: {$sum: 1},
            }
          },
      ]);
      res.status(200).json(data);
      //return; // Prevents further execution
   }catch(err){
      res.status(500).json(err);
      //return; // Prevents further execution
   }
});

//using customer model create route for update point value only
router.put('/customer/:id',async (req,res)=>{
   try
   {
    const updatedUser = await Customer.findByIdAndUpdate(req.params.id,{
      $set : req.body,
    },{new: true});
    
    res.status(200).json(updatedUser);
    return; // Prevents further execution

   }catch (err){
      res.status(500).json(err);
      return; // Prevents further execution
   }
});

//create route /customer/find/:id for find single customer
router.get('/customer/find/:id',async (req,res)=>{
   try{

    const user = await Customer.findById(req.params.id);

    const {password,...others} = user._doc;

    res.status(200).json(others);
    return; // Prevents further execution
   }catch(err)
   {
      res.status(500).json(err);
      return; // Prevents further execution
   }
})

//get all users where the type is delivery
router.get('/delivery',async (req,res)=>{
   
   try{
      
      const users = await User.find({type: "delivery"});

      res.status(200).json(users);
      return; // Prevents further execution
   }catch(err)
   {
      res.status(500).json(err);
      return; // Prevents further execution
   }
})





module.exports = router;
