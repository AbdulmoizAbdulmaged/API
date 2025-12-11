const router = require('express').Router();
const Food = require('../models/food');
const { verifyToken,verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verifyToken');


//Create
router.post("/",verifyTokenAndAdmin,async (req,res)=>{

  const newFood = new Food(req.body);

  try{
    const savedFood = await newFood.save();
    res.status(200).json(savedFood);
     // Prevents further execution
  }catch(err){
    res.status(500).json(err);
     // Prevents further execution
  }


});
//Update
router.put('/:id',verifyTokenAndAdmin,async (req,res)=>{
  try{
    const updatedFood = await Food.findByIdAndUpdate(req.params.id,
      {
        $set:  req.body
       
      },
        {new: true}
      );
      res.status(200).json(updatedFood);
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

  await Food.findByIdAndDelete(req.params.id);
  res.status(200).json("Food has been deleted");
  return; // Prevents further execution

 }
 catch(err)
 {
  res.status(500).json(err);
  return; // Prevents further execution
 }
})

//GET Food
router.get('/find/:id',async (req,res)=>{
  try{
       const Food = await Food.findById(req.params.id);
       res.status(200).json(Food);
       return; // Prevents further execution
  }catch(err)
  {
    res.status(200).json(err);
    return; // Prevents further execution
  }
});

//Get by Category


//GET all Foods
// router.get('/',async (req,res)=>{
//   try{
//     let Foods;
//     const qNew = req.query.new;
//     const qCategory = req.query.category;

//     if(qNew){
      
//       Foods = await Food.find().sort({createdAt: -1})
//    }else if(qCategory)
//    {
//     Foods = await Food.find({
//       categories:{
//         $in: [qCategory]
//       }
//     })
//    }else{
//     Foods = await Food.find();
  
//    }
//    res.status(200).json(Foods);
//    return; // Prevents further execution
//   }catch{

//   }
// })
router.get('/', async (req, res) => {
  try {
    let Foods;
    const qNew = req.query.new;
    const qCategory = req.query.category;

    // Base filter: only items with inStock = 1
    let filter = { inStock: 1 };

    if (qCategory) {
      filter.categories = { $in: [qCategory] };
    }

    if (qNew) {
      Foods = await Food.find(filter).sort({ createdAt: -1 });
    } else {
      Foods = await Food.find(filter);
    }

    res.status(200).json(Foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;