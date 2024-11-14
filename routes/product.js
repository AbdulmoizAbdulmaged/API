const router = require('express').Router();
const Product = require('../models/product');
const { verifyToken,verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verifyToken');


//Create
router.post("/",verifyTokenAndAdmin,async (req,res)=>{

  const newProduct = new Product(req.body);

  try{
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
     // Prevents further execution
  }catch(err){
    res.status(500).json(err);
     // Prevents further execution
  }


});
//Update
router.put('/:id',verifyTokenAndAdmin,async (req,res)=>{
  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
      {
        $set:  req.body
       
      },
        {new: true}
      );
      res.status(200).json(updatedProduct);
      return; // Prevents further execution
  }catch(err)
  {
    res.status(500).json(err);
    return; // Prevents further execution
  }
 
});

//Delete
router.delete('/:id',verifyTokenAndAdmin,async (req,res)=>{
 try
 {

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json("Product has been deleted");
  return; // Prevents further execution

 }
 catch(err)
 {
  res.status(500).json(err);
  return; // Prevents further execution
 }
})

//GET Product
router.get('/find/:id',async (req,res)=>{
  try{
       const product = await Product.findById(req.params.id);
       res.status(200).json(product);
       return; // Prevents further execution
  }catch(err)
  {
    res.status(200).json(err);
    return; // Prevents further execution
  }
});

//Get by Category


//GET all products
router.get('/',async (req,res)=>{
  try{
    let products;
    const qNew = req.query.new;
    const qCategory = req.query.category;

    if(qNew){
      products = await Product.find().sort({createdAt: -1}).limit(5);
   }else if(qCategory)
   {
    products = await Product.find({
      categories:{
        $in: [qCategory]
      }
    })
   }else{
    products = await Product.find();
  
   }
   res.status(200).json(products);
   return; // Prevents further execution
  }catch{

  }
})



module.exports = router;