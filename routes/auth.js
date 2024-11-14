const router = require('express').Router();
const User = require('../models/user');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register
router.post('/register',async (req,res)=>{
 const newUser = new User({
  username: req.body.username,
  email: req.body.email,
  password: Crypto.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
  phone: req.body.phone,
  address: req.body.address,
  isAdmin: req.body.isAdmin,
  img: req.body.img
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

//Login
router.post('/login',async (req,res)=>{

  
  try
  {
   const user = await User.findOne({username: req.body.username});

   !user && res.status(401).json('wrong credintials');

   const orgPassword =  Crypto.AES.decrypt(user.password,process.env.PASS_SEC).toString(Crypto.enc.Utf8);

   orgPassword !== req.body.password && res.status(401).json("wrong password credentials");

   const accessToken = jwt.sign(
    {
      id: user._id,isAdmin: user.isAdmin
    },
    process.env.JWT_SEC,
    {expiresIn: "30m"}
   );
   const {password, ...others} = user._doc;

   res.status(200).json({...others,accessToken});
  
   
   //

  

  

  }catch(err){
   // res.status(500).json(err);
    
  }
  

})

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
  

})


module.exports = router;