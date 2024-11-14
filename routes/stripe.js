const router = require('express').Router();
const stripe = require('stripe')("sk_test_51Oo2gmCF9ap7lAywapAw8jXZWzozTDLgyTeIpI2jAWqcTqjQvVeXMG0DM7RkGkUep0q2TCmEWJxoHq3QzkCrpDs000Aaw804C9");

router.post('/payment',(req,res)=>{
stripe.charges.create(

  {
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd"
  
  },
  (stripeErr,stripeRes)=>{

    if(stripeErr){
      res.status(500).json(stripeErr);
    }else{
      res.status(200).json(stripeRes);
    }

  }
)
})




module.exports = router;