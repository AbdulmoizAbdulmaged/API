const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = (req,res,next)=>{
 
  const authHeader = req.headers.token;
  try{

    if(authHeader){
      const token = authHeader.split(" ")[1];
      jwt.verify(token,process.env.JWT_SEC,(req,res,(err,user)=>{
        if(err) res.status(403);//.json("token is not valid");
  
        req.user = user;
        next();
      }))
  
    }else{
     return  res.status(401).json("there is no token");
    }

  }catch{}

 

}

const verifyTokenAndAutherization = (req,res,next)=>{
  try{

    verifyToken(req,res,()=>{
      if(req.user.id === req.params.id || req.user.isAdmin)
      {
        next();
      }else
      {
        res.status(403).json("you are not allow to do that");
      }
    })

  }catch{}
  
}

const verifyTokenAndAdmin = (req,res,next)=>{
  try{

    verifyToken(req,res,()=>{
      if(req.user.isAdmin)
      {
        next();
      }else
      {
        res.status(403).json("you are not allow to do that");
      }
    })

  }catch{}
}

module.exports = {verifyToken,verifyTokenAndAutherization,verifyTokenAndAdmin}