const router = require('express').Router();
const User = require('../models/user');
const Customer = require('../models/customer');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const { verifyTokenAndAdmin } = require('./verifyToken');
const customer = require('../models/customer');

//Register
router.post('/register',async (req,res)=>{
 const newUser = new User({
  username: req.body.username,
  email: req.body.email,
  password: Crypto.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
  phone: req.body.phone,
  address: req.body.address,
  isAdmin: req.body.isAdmin,
  img: req.body.img,
  wish: req.body.wish,
  type: req.body.type,
  isBlocked: req.body.isBlocked,
 });

 try{

  const saveUser = await newUser.save();

 res.status(201).json(saveUser);
 return; // Prevents further execution
 }catch(err)
 {
  res.status(500).json(err);
  return; // Prevents further execution
 }
 
 
});

//Customer Register
router.post('/cust',async (req,res)=>{
  const user = await Customer.findOne({phone: req.body.phone});

  if (user) {
    return res.status(404).json({ message: "User  found" }); // Use return to stop further execution
    // Prevents further execution
  }
 const newUser = new Customer({
  name: req.body.name,
  phone: req.body.phone,
  password: Crypto.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
  email: req.body.email,
  address: req.body.address,
  point: req.body.point,
 
 });

 try{

  const saveUser = await newUser.save();

 res.status(201).json(saveUser);
 return; // Prevents further execution
 }catch(err)
 {
  res.status(500).json(err);
  return; // Prevents further execution
 }
 
 
});

//Admin Login
router.post('/login',async (req,res)=>{

  
  try
  {
   const user = await User.findOne({email: req.body.email});

   !user && res.status(401).json('wrong credintials');

   const orgPassword =  Crypto.AES.decrypt(user.password,process.env.PASS_SEC).toString(Crypto.enc.Utf8);

   orgPassword !== req.body.password && res.status(401).json("wrong password credentials");

   const accessToken = jwt.sign(
    {
      id: user._id,isAdmin: user.isAdmin
    },
    process.env.JWT_SEC,
    {expiresIn: "1000d"}
   );
   const {password, ...others} = user._doc;

   res.status(200).json({...others,accessToken});
  
   
   //

  

  

  }catch(err){
   // res.status(500).json(err);
    
  }
  

})

//Customer Login for the restaurant delivery android app.
router.post('/customer',async (req,res)=>{

  
  try
  {
   const user = await Customer.findOne({phone: req.body.phone});

   !user && res.status(401).json('wrong credintials');

   const orgPassword =  Crypto.AES.decrypt(user.password,process.env.PASS_SEC).toString(Crypto.enc.Utf8);

   orgPassword !== req.body.password && res.status(401).json("wrong password credentials");

  //  const accessToken = jwt.sign(
  //   {
  //     id: user._id,isAdmin: user.isAdmin
  //   },
  //   process.env.JWT_SEC,
  //   {expiresIn: "1000d"}
  //  );
  //  const {password, ...others} = user._doc;

   res.status(200).json(user);
  
   
   //

  

  

  }catch(err){
   // res.status(500).json(err);
    
  }
  

})

//sign for the Ecommerce website
router.post('/signin',async (req,res)=>{

  
  try
  {
   const user = await User.findOne({phone: req.body.phone});

   !user && res.status(401).json('Phone number is not found');

   const accessToken = jwt.sign(
    {
      id: user._id,isAdmin: user.isAdmin
    },
    process.env.JWT_SEC,
    {expiresIn: "1000d"}
   );
   const {password, ...others} = user._doc;

   res.status(200).json({...others,accessToken}); 
   //
  }catch(err){
   // res.status(500).json(err);
    
  }
  

});

//delivery user login
router.post('/delivery',async (req,res)=>{

  
  try
  {
   const user = await User.findOne({phone: req.body.phone});      
    !user && res.status(401).json('Phone number is not found');
    const orgPassword =  Crypto.AES.decrypt(user.password,process.env.PASS_SEC).toString(Crypto.enc.Utf8);
    orgPassword !== req.body.password && res.status(401).json("wrong password credentials");
    const accessToken = jwt.sign(
      {
        id: user._id,isAdmin: user.isAdmin
      },
      process.env.JWT_SEC,
      {expiresIn: "1000d"}
    );
    const {password, ...others} = user._doc;
    res.status(200).json({...others,accessToken});
  }catch(err){
    //res.status(500).json(err);
    }
}
);



module.exports = router;